import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./home.css";

interface Item {
  imageURL: string;
  id: string;
  name: string;
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
        const data = { id: doc.id, ...doc.data() } as Item;
        fetchedItems.push(data);
      });
      setItems(fetchedItems);
    };

    fetchData();
  }, []);

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
      {items.map((item) => (
        <Link to={`/announce/${item.id}`} key={item.id}>
          <div className="container">
            <div className="block" key={item.id}>
              <img src={item.imageURL} alt="image" />
              <div className="text-container">
                <h2>{item.name}</h2>
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
