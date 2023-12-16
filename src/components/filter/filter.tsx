import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import "./filter.css";

interface FilterProps {
  imageURL: string;
  id: string;
  name: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

function Filter() {
  const { id } = useParams<{ id: string }>();
  const [filter, setFilter] = useState<FilterProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const filterDoc = await getDoc(doc(db, "filter", id as string));
      const data = { id: filterDoc.id, ...filterDoc.data() } as FilterProps;
      setFilter(data);
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
              <Link to="/filter">Фильтр</Link>
            </li>
            <li>
              <Link to="/news">Новости</Link>
            </li>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-content">
        <div className="filters">
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
            <input type="text" id="mileageFrom" placeholder="От, км" />
          </div>
          <div>
            <label htmlFor="mileageTo">Пробег до:</label>
            <input type="text" id="mileageTo" placeholder="До, км" />
          </div>
          <div>
            <label htmlFor="fuelType">Тип топлива:</label>
            <select id="fuelType">
              <option value="petrol">Бензин</option>
              <option value="diesel">Дизель</option>
            </select>
          </div>
          <div>
            <label htmlFor="seats">Количество мест:</label>
            <select id="seats">
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <div>
            <label htmlFor="engineVolumeFrom">Объем двигателя от:</label>
            <input type="text" id="engineVolumeFrom" placeholder="От, л" />
          </div>
          <div>
            <label htmlFor="engineVolumeTo">Объем двигателя до:</label>
            <input type="text" id="engineVolumeTo" placeholder="До, л" />
          </div>
          <div>
            <label htmlFor="region">Регион авто:</label>
            <select id="region">
              <option value="north">Винницкая</option>
              <option value="south">Волынская</option>
              <option value="north">Днепропетровская</option>
              <option value="south">Донецкая</option>
              <option value="north">Житомирская</option>
              <option value="south">Закарпатская</option>
              <option value="north">Запорожская</option>
              <option value="south">Ивано-Франковская</option>
              <option value="north">Киевская</option>
              <option value="south">Кировоградская</option>
              <option value="north">Луганская</option>
              <option value="south">Львовская</option>
              <option value="north">Николаевская</option>
              <option value="south">Одесская</option>
              <option value="north">Полтавская</option>
              <option value="south">Ровенская</option>
              <option value="north">Сумская</option>
              <option value="south">Тернопольская</option>
              <option value="north">Харьковская</option>
              <option value="south">Херсонская</option>
              <option value="north">Хмельницкая</option>
              <option value="south">Черкасская</option>
              <option value="north">Черновицкая</option>
              <option value="south">Черниговская</option>
              <option value="north">Крым</option>
            </select>
          </div>
        </div>
        <div className="container">
          <div className="block">
            <img src={filter?.imageURL} alt="image" />
            <div className="text-container">
              <h2>{filter?.name}</h2>
              <p>{filter?.text_1}</p>
              <p>{filter?.text_2}</p>
              <p>{filter?.text_3}</p>
            </div>
          </div>
          <div className="container-search">
            <div className="search-bar">
              <input type="text" placeholder="Поиск..." />
              <button>Найти</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Filter;
