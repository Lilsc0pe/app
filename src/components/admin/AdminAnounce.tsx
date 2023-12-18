import React, { useState, ChangeEvent } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

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

  return (
    <div className="container-announce">
      <img src={editedItem.imageURL} alt="image" />
      <div className="block">
        <div className="text-container">
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleInputChange}
          />
          <textarea
            name="text_1"
            value={editedItem.text_1}
            onChange={handleInputChange}
          ></textarea>
          <textarea
            name="text_2"
            value={editedItem.text_2}
            onChange={handleInputChange}
          ></textarea>
          <textarea
            name="text_3"
            value={editedItem.text_3}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={handleSaveChanges}>Сохранить изменения</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnounce;
