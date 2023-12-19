import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import "./editProfile.css";

export interface IData {
  id: string;
  name: string;
}
function EditProfile() {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [nameLoad, setNameLoad] = useState("");

  useEffect(() => {
    getDocs(collection(db, "name")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => {
        return doc.data() as IData;
      });
      const getName = newData.find(
        (value: IData) => value.id === auth.currentUser?.uid
      );
      if (getName !== undefined) {
        setName(getName.name);
        setNameLoad(getName.name);

        setEmail(auth.currentUser?.email || "");
      }
    });
  }, []);

  const handleChange = async () => {
    try {
      if (auth.currentUser !== null) {
        const ref = await getDocs(collection(db, "name")).then(
          (querySnapshot) => {
            let id = "";
            querySnapshot.docs.forEach((doc) => {
              if (doc.data().id === auth.currentUser?.uid) {
                id = doc.id;
              }
            });
            return id;
          }
        );
        const newDoc = doc(db, "name", ref);

        updateDoc(newDoc, { id: auth.currentUser.uid, name });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="form-profile">
        <h2 className="name-content-edit-profile">Edit</h2>
        <div className="name-change-profile">
          <label htmlFor="name-change-profile">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
        </div>

        <Link to="/profile">
          <button className="btn-edit-profile-submit btn-profile-together" type="submit" onClick={handleChange}>
            Change
          </button>
        </Link>
      </form>
    </div>
  );
}

export default EditProfile;
