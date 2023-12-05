import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./home.css";

import backgroundImage from "../images/background-img.png";

function Home() {
  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="nav-links">
            <li className="li-center">
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
        <div className="block">
          <img src={backgroundImage} alt="image" />
          <p>Text-1</p>
          <p>Text-2</p>
          <p>Text-3</p>
        </div>
        <div className="block">
          <img src={backgroundImage} alt="image" />
          <p>Text-1</p>
          <p>Text-2</p>
          <p>Text-3</p>
        </div>

        <div className="block">
          <img src={backgroundImage} alt="image" />
          <p>Text-1</p>
          <p>Text-2</p>
          <p>Text-3</p>
        </div>
        <div className="block">
          <img src={backgroundImage} alt="image" />
          <p>Text-1</p>
          <p>Text-2</p>
          <p>Text-3</p>
        </div>
      </div>
    </form>
  );
}

export default Home;
