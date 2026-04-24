"use client";
import { ReactContactForm } from "@/features/react-contact-form/ui/ReactContactForm";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error }: any) => {
  return (
    <div className="text-center text-red-400 p-4">
      Ошибка: {error?.message || "Неизвестная ошибка"}
    </div>
  );
};

interface DemoPreviewProps {
  isEnabled: boolean;
}

export function DemoPreview({ isEnabled }: DemoPreviewProps) {
  if (!isEnabled) {
    return (
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-transparent rounded-sm blur"></div>
        <div className="relative bg-black/40 backdrop-blur-md border border-primary/30 p-8 h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            Click "Run" to see the demo
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-transparent rounded-sm blur"></div>
      <div className="relative bg-black/40 backdrop-blur-md border border-primary/30 p-8 h-full flex items-center justify-center">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ReactContactForm />
        </ErrorBoundary>
      </div>
    </div>
  );
}
