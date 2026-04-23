export const translations = {
  ru: {
    subjectToOwner: (name: string) => `Новое сообщение от ${name}`,
    subjectToUser: "Ваше сообщение получено!",
    confirmation: {
      title: "Спасибо за ваше сообщение",
      subtitle: "Я получила ваше письмо и обязательно отвечу вам лично",
      statusLabel: "статус обработки",
      statusText:
        "Ваше сообщение успешно доставлено.<br>Я внимательно его прочитаю и вернусь с ответом в течение <span style='color:#00ff9d;'>1–2 рабочих дней</span>.",
      signature: "с уважением,",
      name: "Яна Казакова",
      role: "Frontend Developer",
      autoNotice: "это автоматическое письмо, отвечать на него не нужно",
    },
    ownerMessage: {
      heading: "Новое сообщение с сайта",
      senderLabel: "Отправитель:",
      replyEmailLabel: "Email для ответа:",
      messageLabel: "Сообщение:",
    },
    errors: {
      allFieldsRequired: "Все поля обязательны для заполнения.",
      invalidEmail: "Пожалуйста, введите корректный email адрес.",
      failedToSendToOwner: "Не удалось отправить письмо владельцу",
      internalServerError: "Произошла внутренняя ошибка сервера.",
    },
  },
  en: {
    subjectToOwner: (name: string) => `New message from ${name}`,
    subjectToUser: "Your message has been received!",
    confirmation: {
      title: "Thank you for your message",
      subtitle: "I have received your email and will respond to you personally",
      statusLabel: "processing status",
      statusText:
        "Your message has been successfully delivered.<br>I will read it carefully and get back to you within <span style='color:#00ff9d;'>1–2 business days</span>.",
      signature: "best regards,",
      name: "Yana Kazakova",
      role: "Frontend Developer",
      autoNotice: "this is an automated email, please do not reply",
    },
    ownerMessage: {
      heading: "New message from website",
      senderLabel: "Sender:",
      replyEmailLabel: "Reply email:",
      messageLabel: "Message:",
    },
    errors: {
      allFieldsRequired: "All fields are required.",
      invalidEmail: "Please enter a valid email address.",
      failedToSendToOwner: "Failed to send email to owner",
      internalServerError: "Internal server error occurred.",
    },
  },
};
