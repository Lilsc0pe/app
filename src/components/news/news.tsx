import { useState, useEffect, ReactNode, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./news.css";
//language
import { LanguageContext } from "../../contexts/LanguageContext";
import LanguageSwitchButton from "../../contexts/LanguageSwitchButton";
import { translations } from "../../contexts/translations";

interface News {
  imageNewsURL: string;
  id: string;
  name: string;
  description: string;
}

function News() {
  const [news, setNews] = useState<News[]>([]);

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

  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }

  const { language } = languageContext;
  const currentTranslation =
    translations[language as keyof typeof translations];

  return (
    <form className="form-home">
      <header className="header-filter">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="auth-lang-selector">
            <li>
              <Link to="/home">{currentTranslation.home}</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-lang-selector nav-bar-auth">
          <LanguageSwitchButton />
          {auth.currentUser ? (
            <li>
              <Link to="/profile">{currentTranslation.profile}</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">{currentTranslation.login}</Link>
              </li>
              <li>
                <Link to="/register">{currentTranslation.register}</Link>
              </li>
            </>
          )}
        </div>
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
