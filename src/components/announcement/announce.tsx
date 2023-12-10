import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const itemDoc = await getDoc(doc(db, "home", id as string));
      const data = { id: itemDoc.id, ...itemDoc.data() } as Item;
      setItem(data);
    };

    fetchData();
  }, [id]);

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="nav-links">
          <li>
              <Link to="/announce">Оголошення</Link>
            </li>
            <li>
              <Link to="/news">Новини</Link>
            </li>
            <li>
              <Link to="/login">Вхід</Link>
            </li>
            <li>
              <Link to="/register">Регістрація</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-content">
        <div className="filters">
          {/* Фильтры */}
          <h3>Фильтры</h3>
          <div>
               <label htmlFor="brand">Марка авто:</label>
             <select id="brand">
           <option value="audi">Audi</option>
           <option value="bmw">BMW</option>
           <option value="mercedes">Mercedes-Benz</option>
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
          <option value="fiat">Fiat</option>
             </select>
          </div>
          <div>
            <label htmlFor="year">Год випуску авто:</label>
            <input type="text" id="year" />
          </div>
          <div>
            <label htmlFor="status">Статус авто:</label>
            <select id="status">
              <option value="new">Новий</option>
              <option value="used">Б/у</option>
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
              {/* Другие варианты топлива */}
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
        </div>
        <div className="search-bar">
          {/* Поисковая строка */}
          <input type="text" placeholder="Поиск..." />
          <button>Найти</button>
          <div className="ad-box">
        <img src="url_to_your_image_1" alt="Ad Image 1" />
        <div className="ad-info">
          <h3>Название предложения 1</h3>
          <p>Описание предложения 1</p>
          <p>Цена: $1000</p>
        </div>
      </div>
      <div className="ad-box">
        <img src="url_to_your_image_2" alt="Ad Image 2" />
        <div className="ad-info">
          <h3>Название предложения 2</h3>
          <p>Описание предложения 2</p>
          <p>Цена: $2000</p>
        </div>
      </div>

      <div className="ad-box">
        <img src="url_to_your_image_3" alt="Ad Image 3" />
        <div className="ad-info">
          <h3>Название предложения 3</h3>
          <p>Описание предложения 3</p>
          <p>Цена: $1500</p>
        </div>
        </div>
        

      
      </div>
      </div>
    </form>
  );
}

export default Announce;
