import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./home.css";
import AdminAnnounce from "../admin/AdminAnounce";
import { LanguageContext } from "../../contexts/LanguageContext";
import LanguageSwitchButton from "../../contexts/LanguageSwitchButton";

export interface Item {
  imageURL: string;
  id: string;
  name: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "home"));
      const fetchedItems: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as Item;
        fetchedItems.push(data);
      });
      setItems(fetchedItems);
    };

    fetchData();
  }, []);

  if (!languageContext) {
    return null;
  }

  const { language } = languageContext;

  const translations = {
    ua: {
      news: "Новини",
      login: "Вхід",
      register: "Регістрація",
    },
    en: {
      news: "News",
      login: "Login",
      register: "Register",
    },
  };

  const filteredItems = items.filter((item) => item.id);

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="auth-lang-selector">
            <li>
              <Link to="/news">
                {translations[language as keyof typeof translations].news}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth-lang-selector nav-bar-auth">
          <LanguageSwitchButton /> {}
          <li>
            <Link to="/login">
              {translations[language as keyof typeof translations].login}
            </Link>
          </li>
          <li>
            <Link to="/register">
              {translations[language as keyof typeof translations].register}
            </Link>
          </li>
        </div>
      </header>
      {filteredItems.map((item) => (
        <AdminAnnounce key={item.id} item={item} />
      ))}
      {items.map((item) => (
        <Link to={`/announce/${item.id}`} key={item.id}>
          <div className="container">
            <div className="-" key={item.id}>
              <img className="img-container" src={item.imageURL} alt="image" />
              <h2>{item.name}</h2>
              <div className="text-container-home">
                <p>{item.text_1}</p>
                <p>{item.text_2}</p>
                <p>{item.text_3}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </form>
  );
}

export default Home;
