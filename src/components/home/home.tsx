import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./home.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Інтерфейс для елементів масиву
interface Item {
  imageUrl: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "home"));
      const fetchedItems: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Item;
        fetchedItems.push(data);
      });
      setItems(fetchedItems);
    };

    fetchData();
  }, []);

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo ">AutoScout</div>
        <nav className="navbar">
          <ul className="nav-links">
            <li className="li-center ">
              <Link to="/">Оголошення</Link>
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
      <div className="container">
        {items.map((item, index) => (
          <div className="block" key={index}>
            <img src={item.imageUrl} alt="image" />
            <p>{item.text_1}</p>
            <p>{item.text_2}</p>
            <p>{item.text_3}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default Home;
