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
            <input type="text" id="brand" />
          </div>
          <div>
            <label htmlFor="year">Год выпуска авто:</label>
            <input type="text" id="year" />
          </div>
          <div>
            <label htmlFor="status">Статус авто:</label>
            <select id="status">
              <option value="new">Новый</option>
              <option value="used">Б/у</option>
            </select>
          </div>
          <div>
            <label htmlFor="mileageFrom">Пробег от:</label>
            <input type="text" id="mileageFrom" placeholder="От" />
          </div>
          <div>
            <label htmlFor="mileageTo">Пробег до:</label>
            <input type="text" id="mileageTo" placeholder="До" />
          </div>
          <div>
            <label htmlFor="fuelType">Тип топлива:</label>
            <select id="fuelType">
              <option value="petrol">Бензин</option>
              <option value="diesel">Дизель</option>
              {/* Другие варианты топлива */}
            </select>
          </div>
          <div>
            <label htmlFor="seats">Количество мест:</label>
            <select id="seats">
              <option value="2">2</option>
              <option value="4">4</option>
              {/* Другие варианты количества мест */}
            </select>
          </div>
          <div>
            <label htmlFor="engineVolumeFrom">Объем двигателя от:</label>
            <input type="text" id="engineVolumeFrom" placeholder="От" />
          </div>
          <div>
            <label htmlFor="engineVolumeTo">Объем двигателя до:</label>
            <input type="text" id="engineVolumeTo" placeholder="До" />
          </div>
          <div>
            <label htmlFor="region">Регион авто:</label>
            <select id="region">
              <option value="north">Север</option>
              <option value="south">Юг</option>
              {/* Другие варианты регионов */}
            </select>
          </div>
        </div>
        <div className="popular-offers">
          {/* Блок с популярными предложениями */}
          {item && (
            <div className="announce">
              <img src={item.imageURL} alt="image" />
              <div className="text-container">
                <h2>{item.name}</h2>
                <p>{item.text_1}</p>
                <p>{item.text_2}</p>
                <p>{item.text_3}</p>
              </div>
            </div>
          )}
        </div>
        <div className="search-bar">
          {/* Поисковая строка */}
          <input type="text" placeholder="Поиск..." />
          <button>Найти</button>
        </div>
      </div>
    </form>
  );
}

export default Announce;
