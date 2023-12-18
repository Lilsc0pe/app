import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from '../../contexts/LanguageContext'; // adjust the path as needed
import LanguageSwitchButton from '../../contexts/LanguageSwitchButton'; // Adjust the path as needed
import "./announce.css";

interface Item {
  imageURL: string;
  id: string;
  name: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

interface AnnounceProps {
  item: Item;
}
function Announce({ item }: AnnounceProps) {
  const languageContext = useContext(LanguageContext);
  
  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language } = languageContext;

  const translations = {
    ua: {
      goTo: 'Перейти',
      home: 'Головна',
      news: 'Новини',
      login: 'Вхід',
      register: 'Регістрація',
    },
    en: {
      goTo: 'Go to',
      home: 'Home',
      news: 'News',
      login: 'Login',
      register: 'Register',
    },
  };
  
  return (
    <div className="container-announce">
      <img src={item.imageURL} alt="image" />
      <div className="block">
        <div className="text-container-home">
          <h2>{item.name}</h2>
          <p>{item.text_1}</p>
          <p>{item.text_2}</p>
          <p>{item.text_3}</p>
          <Link to={`/announce/${item.id}`} className="button">
          {translations[language as keyof typeof translations].goTo}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const { id } = useParams<{ id: string }>(); // Add this line to get the ID from the URL

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
  const languageContext = useContext(LanguageContext);
  
  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language } = languageContext;

  const translations = {
    ua: {
      goTo: 'Перейти',
      home: 'Головна',
      news: 'Новини',
      login: 'Вхід',
      register: 'Регістрація',
    },
    en: {
      goTo: 'Go to',
      home: 'Home',
      news: 'News',
      login: 'Login',
      register: 'Register',
    },
  };
  const filteredItems = items.filter((item) => item.id === id); // Add this line to filter the items array based on the ID

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="auth-lang-selector">
            <li>
              <Link to="/home">{translations[language as keyof typeof translations].home}</Link>
            </li>
            <li>
              <Link to="/news">{translations[language as keyof typeof translations].news}</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-lang-selector nav-bar-auth">
        <LanguageSwitchButton /> {}
            <li>
              <Link to="/login">{translations[language as keyof typeof translations].login}</Link>
            </li>
            <li>
              <Link to="/register">{translations[language as keyof typeof translations].register}</Link>
            </li>
        </div>
      </header>
      {filteredItems.map((item) => (
        <Announce item={item} />
      ))}
    </form>
  );
}

export default Home;
