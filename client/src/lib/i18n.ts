import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import global_en from "@/translations/en/global.json";
import global_ptbr from "@/translations/pt-br/global.json";

const selectedLanguage = localStorage.getItem("language") || "en";

i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: selectedLanguage,
    fallbackLng: "en",

    defaultNS: "global",
    ns: ["global"],

    resources: {
        en: {
            global: global_en,
        },
        ptbr: {
            global: global_ptbr,
        },
    },
});

export default i18next;
