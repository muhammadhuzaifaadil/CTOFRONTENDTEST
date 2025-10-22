// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Try to read from cookie first
  const cookieStore = cookies();
  const cookieLocale = (await cookieStore).get('CTONEXTAPP_LOCALE')?.value;

  // Fallback to English if no cookie or unsupported language
  const supportedLocales = ['en', 'ar'];
  const locale = supportedLocales.includes(cookieLocale || '')
    ? cookieLocale!
    : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
