import React, { createContext, useContext, useState } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [langCode, setLangCode] = useState('en');

  const currentTranslation = translations[langCode] || translations.en;

  const t = (key) => {
    return currentTranslation[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ langCode, setLangCode, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
