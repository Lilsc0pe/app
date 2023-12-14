import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from '../translations/LanguageContext';
import { getTranslation } from '../translations/translationUtils'; // Импорт функции перевода
import "./announce.css";

interface Item {
  imageURL: string;
  id: string;
  name: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

function Announce() {
  const languageContext = useContext(LanguageContext);
  
  const { selectedLanguage = 'uk', toggleLanguage } = languageContext || {}; // Проверка на наличие контекста
  const handleLanguageToggle = () => {
    const newLanguage = selectedLanguage === 'en' ? 'uk' : 'en';
    toggleLanguage(newLanguage);
  };
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const itemDoc = await getDoc(doc(db, "home", id as string));
      const data = { id: itemDoc.id, ...itemDoc.data() } as Item;
      setItem(data);
    };

    fetchData();
  }, [id]);

  const toggleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Избегаем перезагрузки страницы
    setShowFilters(!showFilters);
  };
  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/announce">{getTranslation('announceLink', selectedLanguage)}</Link>
            </li>
            <li>
              <Link to="/news">{getTranslation('newsLink', selectedLanguage)}</Link>
            </li>
            <li>
              <Link to="/login">{getTranslation('loginLink', selectedLanguage)}</Link>
            </li>
            <li>
              <Link to="/register">{getTranslation('registerLink', selectedLanguage)}</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-content">
      <button type="button" onClick={handleLanguageToggle} style={{ marginBottom: '10px' }}>
          {selectedLanguage === 'en' ? 'Switch to Українська' : 'Switch to English'}
        </button>
        <div className="mini-box">
        <div className="search-bar">
          <input type="text" placeholder="Поиск..." />
          <button>Найти</button>
          <button type="button" onClick={() => setShowFilters(!showFilters)}>Фильтры</button>
        </div>
        </div>
        {showFilters && (
          <div className="filters">
          <h3>{getTranslation('filtersTitle', selectedLanguage)}</h3>
          <div>
            <label htmlFor="brand">{getTranslation('brandLabel', selectedLanguage)}</label>
            <select id="brand">
              <option value="audi">{getTranslation('audi', selectedLanguage)}</option>
              <option value="bmw">{getTranslation('bmw', selectedLanguage)}</option>
              <option value="mercedes">{getTranslation('mercedes', selectedLanguage)}</option>
              <option value="toyota">Toyota</option>
           <option value="honda">Honda</option>
           <option value="volkswagen">Volkswagen</option>
           <option value="ford">Ford</option>
           <option value="nissan">Nissan</option>
          <option value="hyundai">Hyundai</option>
          <option value="kia">Kia</option>
          <option value="mazda">Mazda</option>
          <option value="chevrolet">Chevrolet</option>
          <option value="subaru">Subaru</option>
          <option value="peugeot">Peugeot</option>
              {/* Другие варианты брендов */}
            </select>
          </div>
          <div>
            <label htmlFor="year">{getTranslation('yearLabel', selectedLanguage)}</label>
            <input type="text" id="year" />
          </div>
          <div>
            <label htmlFor="status">{getTranslation('statusLabel', selectedLanguage)}</label>
            <select id="status">
              <option value="new">{getTranslation('new', selectedLanguage)}</option>
              <option value="used">{getTranslation('used', selectedLanguage)}</option>
              {/* Другие варианты статуса */}
            </select>
          </div>
          <div>
            <label htmlFor="mileageFrom">Пробіг від:</label>
            <input type="text" id="mileageFrom" placeholder="Від, км" />
          </div>
          <div>
            <label htmlFor="mileageTo">Пробіг до:</label>
            <input type="text" id="mileageTo" placeholder="До, км" />
          </div>
          <div>
            <label htmlFor="fuelType">Тип палива:</label>
            <select id="fuelType">
              <option value="petrol">Бензин</option>
              <option value="diesel">Дизель</option>
              </select>
          </div>
          <div>
            <label htmlFor="seats">Кількість місць:</label>
            <select id="seats">
              <option value="2">2</option>
              <option value="4">4</option>
              {/* Другие варианты количества мест */}
            </select>
          </div>
          <div>
            <label htmlFor="engineVolumeFrom">Об'єм двигуна від:</label>
            <input type="text" id="engineVolumeFrom" placeholder="Від, л" />
          </div>
          <div>
            <label htmlFor="engineVolumeTo">Объем двигателя до:</label>
            <input type="text" id="engineVolumeTo" placeholder="До, л" />
          </div>
          <div>
            <label htmlFor="region">Регіон авто:</label>
            <select id="region">
              <option value="north">Вінницька</option>
              <option value="south">Волинська</option>
              <option value="north">Дніпропетровська</option>
              <option value="south">Донецька</option>
              <option value="north">Житомирська</option>
              <option value="south">Закарпаття</option>
              <option value="north">Запорізька</option>
              <option value="south">Івано-Франківська</option>
              <option value="north">Київська</option>
              <option value="south">Кировоградська</option>
              <option value="north">Луганська</option>
              <option value="south">Львівська</option>
              <option value="north">Миколаївська</option>
              <option value="south">Одеська</option>
              <option value="north">Полтавська</option>
              <option value="south">Рівненьска</option>
              <option value="north">Сумська</option>
              <option value="south">Тернопільска</option>
              <option value="north">Харківська</option>
              <option value="south">Херсонська</option>
              <option value="north">Хмельницька</option>
              <option value="south">Черкаська</option>
              <option value="north">Чернівецька</option>
              <option value="south">Чернігівська</option>
              <option value="north">Крим</option>
              {/* Другие варианты регионов */}
            </select>
          </div>
          {/* Другие фильтры с переводами */}
        </div>
        )}
        {/* ... (остальной код без изменений) */}
      </div>
    </form>
  );
}

export default Announce;