import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import imageUa from "../components/images/flag-ukrainy.png";
import imageEn from "../components/images/flag-uk.jpg";

const LanguageSwitchButtonRegAuth: React.FC = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    return null;
  }

  const { language, setLanguage } = languageContext;

  const switchLanguage = (event: React.MouseEvent) => {
    event.preventDefault();
    setLanguage(language === "ua" ? "en" : "ua");
  };

  const getImageSource = () => {
    return language === 'ua' ? imageUa : imageEn;
  };

  return (
    <div>
      <button className="lang-switch-btn" onClick={switchLanguage}>
        <img src={getImageSource()} alt="Language Image" />
      </button>
     
    </div>
  );
};

export default LanguageSwitchButtonRegAuth;
