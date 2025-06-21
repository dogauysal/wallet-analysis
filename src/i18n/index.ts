import i18n from 'i18next';
import translations from './translations';
import {initReactI18next} from 'react-i18next';
import {Language} from '../enums';

let defaultLangu = Language.ENGLISH;

i18n.use(initReactI18next).init({
  lng: defaultLangu,
  debug: false,
  resources: translations,
});

export default i18n;
