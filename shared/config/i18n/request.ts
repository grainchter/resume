import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export type Locale = 'en' | 'ru';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale | undefined;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale as Locale;
  }

  return {
    locale,
    messages: (await import(`@/shared/config/locales/${locale}.json`)).default,
  };
});