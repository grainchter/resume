"use client";
import { useState } from "react";
import {
  ContactFormData,
  FormStatus,
} from "@/entities/contact-form/model/types";
import { api } from "@/shared/lib/api/apiClient";
import { useLocale, useTranslations } from "next-intl";

interface ReactContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function ReactContactForm({
  onSuccess,
  onError,
}: ReactContactFormProps) {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorText("");
    try {
      const res = await api.post("/send-email", { ...formData, locale });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        onSuccess?.();
      } else {
        setStatus("error");
        const errorMsg = data.message || t("form.errorDefault");
        setErrorText(errorMsg);
        onError?.(errorMsg);
      }
    } catch {
      setStatus("error");
      const networkError = t("form.errorNetwork");
      setErrorText(networkError);
      onError?.(networkError);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black/40 rounded-lg border border-primary/30">
      <h3 className="text-xl text-primary mb-4">{t("form.title")}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t("form.name")}
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
        />
        <input
          type="email"
          name="email"
          placeholder={t("form.email")}
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
        />
        <textarea
          name="message"
          placeholder={t("form.message")}
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary/10 border border-primary text-primary py-2 rounded hover:bg-primary/20 transition disabled:opacity-50"
        >
          {status === "loading" ? t("form.sending") : t("form.submit")}
        </button>
        {status === "success" && (
          <p className="text-green-400 text-sm">{t("form.success")}</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">{errorText}</p>
        )}
      </form>
    </div>
  );
}
