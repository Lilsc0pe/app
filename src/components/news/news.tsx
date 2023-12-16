import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams, Link } from "react-router-dom";
import "./news.css";

interface Item {
  imageNewsURL: string;
  id: string;
  description: string;
}

function News() {
  const [announce, setItem] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemDoc = await getDocs(collection(db, "announce"));
      const data = itemDoc.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Item
      );
      setItem(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {announce !== null &&
        announce.map((item: Item) => (
          <div className="container" key={item.id}>
            <div className="form-container">
              <form>
                <div className="text-container">
                  <img src={item.imageNewsURL} alt="image" />
                  <p>{item.description}</p>
                </div>
                <button>
                  <Link to={`/new${item.id}`}>Читать дальше</Link>
                </button>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
}

export default News;
