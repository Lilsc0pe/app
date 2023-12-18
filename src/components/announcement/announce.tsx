import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import "./announce.css";
//language
import { LanguageContext } from "../../contexts/LanguageContext";
import LanguageSwitchButton from "../../contexts/LanguageSwitchButton";
import { translations } from "../../contexts/translations";

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

function AnnounceItem({ item }: AnnounceProps) {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language } = languageContext;
  const currentTranslation =
    translations[language as keyof typeof translations];

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
            {currentTranslation.goTo}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const { id } = useParams<{ id: string }>();

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
    return null;
  }

  const { language } = languageContext;
  const currentTranslation =
    translations[language as keyof typeof translations];

  const filteredItems = items.filter((item) => item.id === id);

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="auth-lang-selector">
            <li>
              <Link to="/home">{currentTranslation.home}</Link>
            </li>
            <li>
              <Link to="/news">{currentTranslation.news}</Link>
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
      {filteredItems.map((item) => (
        <AnnounceItem key={item.id} item={item} />
      ))}
    </form>
  );
}

export default Home;
