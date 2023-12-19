import React, { useState, ChangeEvent, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./AdminAnounce.css";
//language
import { LanguageContext } from "../../contexts/LanguageContext";
import { translations } from "../../contexts/translations";
// Check the import path for the Item interface
import { Item } from "../home/home";

interface AdminAnnounceProps {
  item: Item;
}

const AdminAnnounce: React.FC<AdminAnnounceProps> = ({ item }) => {
  const [editedItem, setEditedItem] = useState<Item>(item);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const announceDocRef = doc(db, "home", item.id);
      await updateDoc(announceDocRef, editedItem as any);
      alert("Изменения сохранены успешно!");
    } catch (error) {
      console.error("Ошибка при сохранении изменений:", error);
    }
  };
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }

  const { language } = languageContext;
  const currentTranslation =
    translations[language as keyof typeof translations];

  return (
    <div className="container-announce">
      <img src={editedItem.imageURL} alt="image" />
      <div className="block-admin">
        <div className="text-container">
          <h1>{currentTranslation.edit}</h1>
          <h3>{currentTranslation.name}:</h3>
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleInputChange}
          />
          <h3>{currentTranslation.description}:</h3>
          <textarea
            name="description"
            value={editedItem.description}
            onChange={handleInputChange}
          ></textarea>
          <h3>{currentTranslation.value}:</h3>
          <input
            name="value"
            value={editedItem.value}
            onChange={handleInputChange}
          ></input>
          <h3>{currentTranslation.carRegionLabel}:</h3>
          <input
            name="locationCityName"
            value={editedItem.regionName}
            onChange={handleInputChange}
          ></input>
          <button onClick={handleSaveChanges}>{currentTranslation.save}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnounce;
