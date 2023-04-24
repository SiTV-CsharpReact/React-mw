import i18n from 'i18next'
import {initReactI18next} from 'react-i18next';
// import home_en from './src/locales/en/home.json';
import HOME_EN  from '../locales/en/home.json';
import HOME_VI  from '../locales/vi/home.json';
import REPORT_EN from '../locales/en/report.json';
import REPORT_VI from '../locales/vi/report.json';
import LanguageDetector from 'i18next-browser-languagedetector';
export const locales ={
    en:'English',
    vn:'Tiếng Việt'
}
export const resources = {
    VN: {
      home:HOME_VI,
      report:REPORT_VI
    },
    EN: {
      home:HOME_EN,
      report:REPORT_EN
    }
  };
  export const defaultNS = 'home';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    ns:['home','report'],
    defaultNS,
    // preload: ['VI'],
    detection:{
      order: [ 'cookie','querystring', 'localStorage'],
      lookupCookie: 'aspfpt_language',
      caches: ['cookie'] // chon cookie là language chinh
     },
    // cookieDomain: configs.APP_DOMAIN,  ten domain
    fallbackLng: 'VN',// language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });