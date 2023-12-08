import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./news.css";

const News: React.FC = () => {
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX626oExz_QvgK2pTYB9k1IShrSzfTwhsbgKAxdXxU2g&s"
                  alt="Example Image"
                />
              </div>
              <h1>Машины продаются дешево</h1>
              <h6>Поскольку машина это машина ее можно использовать как машина, что значит машины есть</h6>
              <button>Читать дальше</button>
            </form>
          </div>
        </div>
  
        <div className="container">
          <div className="form-container">
            <form>
              <div className="text-container">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RZqrMA2Vz1C6IXjG-DrJjk0QHdHGgBCUrK3wJacNQA&s"
                  alt="Example Image"
                />
              </div>
              <h1>Шок!!!Самый популярный цвет в 2024</h1>
              <h6>Самый популярный цвет в 2024 это ... поскольку он помогает понять что у человека на уме</h6>
              <button>Читать дальше</button>
            </form>
          </div>
        </div>
  
        <div className="container">
          <div className="form-container">
            <form>
              <div className="text-container">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp2ZOLwa3rgbjXJ2vKywdaGMFdgMG6S1e0HIZOhsY4jw&s"
                  alt="Example Image"
                />
              </div>
              <h1>Самая популярная машина из СССР</h1>
              <h6>Косвенный признак № 1: в СССР объем рынка был почти равен объему выпуска · Косвенный признак (легенда) № 2. · Косвенный признак № 3. · Первое место ...</h6>
              {/* <a href="profile.tsx" target="_blank"> */}
              <button>Читать дальше</button>
              {/* </a> */}
            </form>
          </div>
        </div>
    );
  };
  
  export default News;