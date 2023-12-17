import React, { useState, useEffect, ReactNode, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { LanguageContext } from '../../contexts/LanguageContext'; // adjust the path as needed
import LanguageSwitchButton from '../../contexts/LanguageSwitchButton'; // Adjust the path as needed
import "./news.css";

interface News {
  imageNewsURL: string;
  id: string;
  name: string;
  description: string;
}

function News() {
  const [news, setNews] = useState<News[]>([]);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedNews: News[] = [];
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as News;
        fetchedNews.push(data);
      });
      setNews(fetchedNews);
    };

    fetchData();
  }, []);

  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language } = languageContext;

  const translations = {
    ua: {
      home: 'Головна',
      login: 'Вхід',
      register: 'Регістрація',
    },
    en: {
      home: 'Home',
      login: 'Login',
      register: 'Register',
    },
  };

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="nav-links">
          <li>
              <Link to="/home">{translations[language as keyof typeof translations].home}</Link>
            </li>
            <li>
              <Link to="/login">{translations[language as keyof typeof translations].login}</Link>
            </li>
            <li>
              <Link to="/register">{translations[language as keyof typeof translations].register}</Link>
            </li>
          </ul>
          <LanguageSwitchButton /> {/* Use LanguageSwitchButton */}
        </nav>
      </header>
      {news.map((News) => (
        <Link to={`/announce/${News.id}`} key={News.id}>
          <div className="container">
            <div className="-" key={News.id}>
              <img
                className="img-container"
                src={News.imageNewsURL}
                alt="image"
              />
              <h2>{News.name}</h2>
              <div className="text-container-home">
                <p>{News.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </form>
  );
}

export default News;
