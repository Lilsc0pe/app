import { useState, useEffect, useContext } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import AdminAnnounce from "../admin/AdminAnounce";
import "./home.css";
//language
import { LanguageContext } from "../../contexts/LanguageContext";
import LanguageSwitchButton from "../../contexts/LanguageSwitchButton";
import { translations } from "../../contexts/translations";

export interface Item {
  imageURL: string;
  id: string;
  name: string;
  description: string;
  value: number;
  regionName: string;
  linkToView: string;
}

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [inputId, setInputId] = useState("");
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  const handleButtonClick = async () => {
    const response = await fetch(
      `https://developers.ria.com/auto/info?api_key=icYRfK5K7HNjAJHFM3YUgmDmjkhk3GmPQKUdq4wN&auto_id=${inputId}`
    );
    const data = await response.json();
    const newItem: Item = {
      imageURL: data.photoData?.seoLinkM || "",
      id: data.autoData?.autoId || "",
      name: data.title || "",
      description: data.autoData?.description || "",
      regionName: data.stateData?.regionName || "",
      value: data.UAH || 0,
      linkToView: data.linkToView || "",
    };
    await addDoc(collection(db, "home"), newItem);
    setItems((prevItems) => [...prevItems, newItem]);
  };

  if (!languageContext) {
    return null;
  }

  const { language } = languageContext;
  const currentTranslation =
    translations[language as keyof typeof translations];

  const filteredItems = items.filter((item) => item.id);

  return (
    <form className="form-home">
      <header className="header-filter">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="auth-lang-selector">
            <li>
              <Link to="/news">{currentTranslation.news}</Link>
            </li>
            <li>
              <Link to="/filter">{currentTranslation.filtersHeading}</Link>
            </li>
          </ul>
        </nav>

        <div className="input-container">
          <input
            className="input-field"
            type="text"
            value={inputId}
            onChange={handleInputChange}
            placeholder="Enter ID"
          />
          <button
            className="load-button"
            type="button"
            onClick={handleButtonClick}
          >
            Load Data
          </button>
        </div>

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
        <AdminAnnounce key={item.id} item={item} />
      ))}
      {items.map((item) => (
        <Link to={`/announce/${item.id}`} key={item.id}>
          <div className="container">
            <div key={item.id}>
              <img className="img-container" src={item.imageURL} alt="image" />
              <h2>{item.name}</h2>
              <div className="text-container-home">
                <p>{item.description}</p>
                <p>{item.regionName}</p>
                <p>{item.value}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </form>
  );
}

export default Home;
