"use client";
import { useState } from "react";
import {
  ContactFormData,
  FormStatus,
} from "@/entities/contact-form/model/types";
import { api } from "@/shared/lib/api/apiClient";

interface ReactContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function ReactContactForm({
  onSuccess,
  onError,
}: ReactContactFormProps) {
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
      const res = await api.post("/send-email", formData);
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorText(data.message || "Ошибка отправки");
        onError?.(data.message);
      }
    } catch {
      setStatus("error");
      setErrorText("Ошибка сети. Попробуйте позже.");
      onError?.("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black/40 rounded-lg border border-[#00ffcc]/30">
      <h3 className="text-xl text-[#00ffcc] mb-4">Напишите мне</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-[#00ffcc]"
        />
        <input
          type="email"
          name="email"
          placeholder="Ваш email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-[#00ffcc]"
        />
        <textarea
          name="message"
          placeholder="Сообщение"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-[#00ffcc]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#00ffcc]/10 border border-[#00ffcc] text-[#00ffcc] py-2 rounded hover:bg-[#00ffcc]/20 transition disabled:opacity-50"
        >
          {status === "loading" ? "Отправка..." : "Отправить"}
        </button>
        {status === "success" && (
          <p className="text-green-400 text-sm">Письмо успешно отправлено!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">{errorText}</p>
        )}
      </form>
    </div>
  );
}
