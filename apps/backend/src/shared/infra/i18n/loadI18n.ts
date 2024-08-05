import i18next from 'i18next';
import middleware from 'i18next-http-middleware';

void i18next.use(middleware.LanguageDetector).init({
  fallbackLng: 'en',
});
