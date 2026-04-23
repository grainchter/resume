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
