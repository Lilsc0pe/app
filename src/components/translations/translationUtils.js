export function getTranslation(key, language) {
    let translations;
    if (language === 'uk') {
      translations = require('./announce_uk.json');
    } else if (language === 'en') {
      translations = require('./announce_en.json');
    } else {
      translations = require('./announce_uk.json'); // По умолчанию украинский
    }
  
    return translations[key] || '';
  }