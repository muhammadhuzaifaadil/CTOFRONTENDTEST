"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface LanguageContextType {
  locale: string;
  isArabic: boolean;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  isArabic: false,
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [locale, setLocale] = useState<string>("en");

  // Load locale from cookie or browser
  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CTONEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      document.cookie = `CTONEXTAPP_LOCALE=${browserLocale}; path=/;`;
      setLocale(browserLocale);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "en" ? "ar" : "en";
    document.cookie = `CTONEXTAPP_LOCALE=${newLocale}; path=/;`;
    setLocale(newLocale);
    router.refresh();
  }, [locale, router]);

  const isArabic = locale === "ar";

  return (
    <LanguageContext.Provider value={{ locale, isArabic, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
