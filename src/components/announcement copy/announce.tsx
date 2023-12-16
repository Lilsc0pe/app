import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
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

interface AnnounceProps {
  item: Item;
}

function Announce({ item }: AnnounceProps) {
  return (
    <div className="container-announce">
      <img src={item.imageURL} alt="image" />
      <div className="block">
        <div className="text-container">
          <h2>{item.name}</h2>
          <p>{item.text_1}</p>
          <p>{item.text_2}</p>
          <p>{item.text_3}</p>
          <Link to={`/announce/${item.id}`} className="button">
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const { id } = useParams<{ id: string }>(); // Add this line to get the ID from the URL

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

  const filteredItems = items.filter((item) => item.id === id); // Add this line to filter the items array based on the ID

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
      {filteredItems.map((item) => (
        <Announce item={item} />
      ))}
    </form>
  );
}

export default Home;
