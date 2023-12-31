import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./profile.css";

export interface IData {
  id: string;
  name: string;
}

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser !== null) {
          const querySnapshot = await getDocs(collection(db, "name"));
          const newData = querySnapshot.docs.map((doc) => doc.data() as IData);
          const getName = newData.find(
            (value: IData) => value.id === auth.currentUser?.uid
          );
          if (getName !== undefined) {
            setName(getName.name);
          }
          if (auth.currentUser.email) {
            setEmail(auth.currentUser.email);
          }
        }
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    try {
      auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form-profile">
      {success && (
        <p className="success-message">Changes saved successfully!</p>
      )}
      {error && <p className="error-message">{error.message}</p>}
      <h2 className="name-content-profile">Profile</h2>

      <div className="name-email-profile">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
      <div>
        <Link to="/edit-profile">
          <button className="btn-profile-together btn-edit-profile">Edit Profile</button>
        </Link>
        <Link to="/login">
          <button className="btn-profile-together btn-sign-out-profile" onClick={handleSignOut}>
            Sign Out
          </button>
        </Link>
        <Link to="/home">
          <button className="btn-profile-together btn-go-to-home" onClick={handleSignOut}>
            Home Page
          </button>
        </Link>
      </div>
    </form>
  );
}

export default Profile;
