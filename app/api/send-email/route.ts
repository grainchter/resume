import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { translations } from "@/shared/config/locales/serverLocales";
import { createRateLimiter } from "@/shared/lib/rate-limit/rate-limit";

interface EmailRequestBody {
  name: string;
  email: string;
  message: string;
  locale?: string;
}

function getUserConfirmationHtml(locale: keyof typeof translations): string {
  const t = translations[locale] || translations.en;
  const c = t.confirmation;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.title}</title>
</head>
<body style="margin:0; padding:0; background:#050505; font-family:'JetBrains Mono','SF Mono','Courier New',monospace; color:#d0d0d0;">
  <center style="width:100%; table-layout:fixed;">
    <div style="max-width:620px; margin:0 auto; padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b; border:1px solid #00ff9d33; border-radius:14px; box-shadow:0 0 25px rgba(0,255,157,0.08); overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(90deg,#0f0f0f,#121212); padding:10px 16px; border-bottom:1px solid #00ff9d22;">
            <span style="color:#00ff9d; font-size:11px; letter-spacing:1px;">
              [contact form] / confirmation
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 26px;">
            <div style="text-align:center; margin-bottom:22px;">
              <div style="display:inline-block; padding:8px 12px; border:1px solid #00ff9d55; border-radius:10px; background:#0a0a0a;">
                <span style="color:#00ff9d; font-size:12px;">✓ message sent successfully</span>
              </div>
              <h1 style="color:#00ff9d; font-size:20px; margin:16px 0 6px 0; font-weight:600;">
                ${c.title}
              </h1>
              <p style="color:#9aa0a6; font-size:13px; margin:0;">
                ${c.subtitle}
              </p>
            </div>
            <div style="background:#070707; border:1px solid #00ff9d22; border-radius:10px; padding:16px 18px; margin-bottom:18px;">
              <div style="color:#00ff9d; font-size:12px; margin-bottom:8px;">
                ${c.statusLabel}
              </div>
              <div style="color:#cfcfcf; font-size:13px; line-height:1.6;">
                ${c.statusText}
              </div>
            </div>
            <div style="border-top:1px solid #00ff9d22; padding-top:16px;">
              <p style="margin:0; font-size:12px; color:#8a8a8a;">
                --<br>
                ${c.signature}<br>
                <span style="color:#00ff9d;">${c.name}</span><br>
                ${c.role}
              </p>
              <p style="margin-top:14px; font-size:10px; color:#555; text-align:center;">
                ${c.autoNotice}
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>
</html>
  `;
}

function getUserMessageHtml(
  message: string,
  name: string,
  email: string,
  locale: keyof typeof translations,
): string {
  const t = translations[locale] || translations.en;
  const o = t.ownerMessage;

  return `
<div style="font-family: Arial, sans-serif; background:#0b0b0b; padding:20px; border-radius:12px; border:1px solid #2a2a2a; color:#e6e6e6; max-width:600px;">
  <h2 style="margin-top:0; color:#00ff9d; font-size:18px; letter-spacing:0.3px;">
    ${o.heading}
  </h2>
  <div style="margin:14px 0; padding:12px; background:#111; border-radius:10px; border:1px solid #222;">
    <p style="margin:6px 0;">
      <strong style="color:#9aa0a6;">${o.senderLabel}</strong>
      <span style="color:#ffffff;">${name}</span>
    </p>
    <p style="margin:6px 0;">
      <strong style="color:#9aa0a6;">${o.replyEmailLabel}</strong>
      <a href="mailto:${email}" style="color:#00ff9d; text-decoration:none;">
        ${email}
      </a>
    </p>
  </div>
  <div style="margin-top:12px;">
    <strong style="color:#9aa0a6;">${o.messageLabel}</strong>
    <div style="margin-top:8px; padding:14px; background:#0f0f0f; border-left:3px solid #00ff9d; border-radius:8px; line-height:1.5; white-space:pre-wrap; color:#dcdcdc;">
      ${message.replace(/\n/g, "<br/>")}
    </div>
  </div>
</div>
  `;
}

const resend = new Resend(process.env.RESEND_API_KEY);

function validateInput(
  name: string,
  email: string,
  message: string,
  locale: keyof typeof translations,
) {
  const t = translations[locale] || translations.en;
  if (!name || !email || !message) {
    throw new Error(t.errors.allFieldsRequired);
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error(t.errors.invalidEmail);
  }
}

const rateLimiter = createRateLimiter(2, "60 s");

export async function POST(request: NextRequest) {
  try {
    const ip = (request.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
      ",",
    )[0];
    const { success } = await rateLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Слишком много запросов. Пожалуйста, попробуйте позже." },
        { status: 429 },
      );
    }

    const {
      name,
      email,
      message,
      locale = "en",
    } = (await request.json()) as EmailRequestBody;
    const lang = (
      locale in translations ? locale : "en"
    ) as keyof typeof translations;
    const t = translations[lang];

    validateInput(name, email, message, lang);

    // письмо владельцу
    const { error: errorToOwner } = await resend.emails.send({
      from: `Resume ${process.env.POST_DOMEN}`,
      to: [process.env.EMAIL_TO!],
      subject: t.subjectToOwner(name),
      replyTo: email,
      html: getUserMessageHtml(message, name, email, lang),
    });

    if (errorToOwner) {
      console.error("Resend error (to owner):", errorToOwner);
      throw new Error(t.errors.failedToSendToOwner);
    }

    // письмо пользователю
    const { error: errorToUser } = await resend.emails.send({
      from: `Yana Kazakova ${process.env.POST_DOMEN}`,
      to: [email],
      subject: t.subjectToUser,
      html: getUserConfirmationHtml(lang),
    });

    if (errorToUser) {
      console.error("Resend error (to user):", errorToUser);
    }

    return NextResponse.json({
      success: true,
      message: lang === "ru" ? "Письмо отправлено!" : "Email sent!",
    });
  } catch (error: any) {
    console.error("Ошибка при отправке email:", error);
    let errorLocale = "en";
    try {
      const body = await request.clone().json();
      if (body.locale && body.locale in translations) errorLocale = body.locale;
    } catch {}
    const t =
      translations[errorLocale as keyof typeof translations] || translations.en;
    const errorMessage = error.message || t.errors.internalServerError;
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}
