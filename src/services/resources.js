'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) //loading translations from files
  .use(LanguageDetector) //detect language from browser
  .use(initReactI18next) //integration with react
  .init({
    fallbackLng: 'en',
    returnNull: false,
    returnEmptyString: false,   
    supportedLngs: ['en', 'sr-Cyrl', 'sr-Latn'],
    debug: false,
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;