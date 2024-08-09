import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../services/translations";

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key: string): string => {
    const keys = key.split(".");
    let translation: any = translations[language as keyof typeof translations];

    for (const k of keys) {
      if (!translation[k]) {
        console.error(`Missing translation key: ${key} in ${language}`);
        return key; // Devuelve la clave original si no se encuentra la traducción
      }
      translation = translation[k];
    }

    return translation;
  };

  return { t };
};
