import React, { useState, useEffect, ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./news.css";

interface News {
  imageNewsURL: string;
  id: string;
  name: string;
  description: string;
}

function News() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedNews: News[] = [];
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as News;
        fetchedNews.push(data);
      });
      setNews(fetchedNews);
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
              <Link to="/home">Головна</Link>
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
      {news.map((News) => (
        <Link to={`/announce/${News.id}`} key={News.id}>
          <div className="container">
            <div className="-" key={News.id}>
              <img
                className="img-container"
                src={News.imageNewsURL}
                alt="image"
              />
              <h2>{News.name}</h2>
              <div className="text-container-home">
                <p>{News.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </form>
  );
}

export default News;
