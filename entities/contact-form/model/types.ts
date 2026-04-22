export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';