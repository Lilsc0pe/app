import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";


function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const onSubmit = async (e: any) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        addDoc(collection(db, "name"), {
          id: auth.currentUser?.uid,
          name,
        });
        // updateCurrentUser(auth, {
        //   ...userCredential.user,
        //   emailVerified: true,
        // });
        navigate("/profile");
        // ...
      })
      .catch((error: any) => {
        console.log(error);
        // ..
      });
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email-address">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
        </div>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className="password_input_container">
            <input
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <svg
              className="password_eye"
              xmlns="http://www.w3.org/2000/svg"
              height="10"
              width="12"
              viewBox="0 0 576 512"
              onClick={togglePasswordVisibility}
              style={{
                opacity: isPasswordVisible ? 1 : 0.3, 
              }}
            >
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
          </svg>
        </div>
      </div>

        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>

        <div className="login-question">Do have an account yet?</div>
        <Link className = "nav-page" to="/login">Login</Link>
      
      </form>      
    </div>
  );
}

export default Register;
