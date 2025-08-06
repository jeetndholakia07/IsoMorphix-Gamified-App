import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translation/en.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        }
    },
    fallbackLng: 'en', // default language
    interpolation: {
        escapeValue: false // react already escapes
    }
});

export default i18n;