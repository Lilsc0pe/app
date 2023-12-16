import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // adjust the path as needed

const LanguageSwitchButton: React.FC = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language, setLanguage } = languageContext;

  const switchLanguage = (event: React.MouseEvent) => {
    event.preventDefault();
    setLanguage(language === 'ua' ? 'en' : 'ua');
  };

  return (
    <button onClick={switchLanguage}>
      Switch Language
    </button>
  );
};

export default LanguageSwitchButton;