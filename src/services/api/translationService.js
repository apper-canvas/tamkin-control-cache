import translationsData from '@/services/mockData/translations.json';

class TranslationService {
  constructor() {
    this.translations = {};
    this.initializeTranslations();
  }

  initializeTranslations() {
    translationsData.forEach(item => {
      this.translations[item.key] = {
        ar: item.ar,
        fr: item.fr,
        en: item.en
      };
    });
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
  }

  async getTranslations(language = 'fr') {
    await this.delay();
    const result = {};
    Object.keys(this.translations).forEach(key => {
      result[key] = this.translations[key][language] || this.translations[key].en || key;
    });
    return result;
  }

  async getAllTranslations() {
    await this.delay();
    return { ...this.translations };
  }

  translate(key, language = 'fr') {
    const translation = this.translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  }
}

export default new TranslationService();