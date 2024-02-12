import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptbrJson from './translations/ptBr.json';
import enJson from './translations/en.json';

i18n.use(initReactI18next).init({
        fallbackLng: "ptBr",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ptBr: ptbrJson,
            en: enJson,
        },
    }
);

export default i18n;