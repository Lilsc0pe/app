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
      <div>
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
    </form>
  );
}

export default Announce;
