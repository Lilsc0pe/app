import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./news.css";

interface Item { 
  imageURL: string; 
  id: string; 
  name: string; 
  text_1: string; 
  text_2: string; 
  text_3: string; 
} 
 
function news() { 
  const { id } = useParams(); 
  const [announce, setItem] = useState<Item | null>(null); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      const itemDoc = await getDoc(doc(db, "announce", id as string)); 
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


        <div className="container">
          <div className="form-container">
            <form>
              <div className="text-container">
                <img
                  src="car1.png"
                  alt="Example Image"
                />
              </div>
              <h1>Машины продаются дешево</h1>
              <h6>Поскольку машина это машина ее можно использовать как машина, что значит машины есть</h6>
              <button onClick={Link to="/news_block1"}>Читать дальше</button>
            </form>
          </div>
        </div>
  
        <div className="container">
          <div className="form-container">
            <form>
              <div className="text-container">
                <img
                  src="car2.png"
                  alt="Example Image"
                />
              </div>
              <h1>Шок!!!Самый популярный цвет в 2024</h1>
              <h6>Самый популярный цвет в 2024 это ... поскольку он помогает понять что у человека на уме</h6>
              <button onClick={Link to="/news_block2"}>Читать дальше</button>
            </form>
          </div>
        </div>
  
        <div className="container">
          <div className="form-container">
            <form>
              <div className="text-container">
                <img
                  src="car3.png"
                  alt="Example Image"
                />
              </div>
              <h1>Самая популярная машина из СССР</h1>
              <h6>Косвенный признак № 1: в СССР объем рынка был почти равен объему выпуска · Косвенный признак (легенда) № 2. · Косвенный признак № 3. · Первое место ...</h6>
              <button onClick={Link to="/news_block3"}>Читать дальше</button>
            </form>
          </div>
        </div>
    );
  };
  
  export default news;