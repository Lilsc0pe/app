import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { LanguageContext } from "../../contexts/LanguageContext"; // adjust the path as needed
import LanguageSwitchButton from "../../contexts/LanguageSwitchButton"; // Adjust the path as needed
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language } = languageContext;

  const translations = {
    ua: {
      emailAddress: "Адреса електронної пошти",
      password: "Пароль",
      login: "Вхід",
      dontHaveAccount: "Ще немаєте облікового запису?",
      signUp: "Зареєструватися",
    },
    en: {
      emailAddress: "Email address",
      password: "Password",
      login: "Login",
      dontHaveAccount: "Don't have an account yet?",
      signUp: "Sign up",
    },
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/profile");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <form className="form-registration-login-profile">
        <div>
          <label htmlFor="email-address">
            {translations[language as keyof typeof translations].emailAddress}
          </label>
          <input
            className="input-auth"
            id="email-address"
            name="email"
            type="email"
            required
            placeholder={
              translations[language as keyof typeof translations].emailAddress
            }
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            {translations[language as keyof typeof translations].password}
          </label>
          <div className="password-input-container">
            <input
              className="input-auth"
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              required
              placeholder={
                translations[language as keyof typeof translations].password
              }
              onChange={(e) => setPassword(e.target.value)}
            />

            <svg
              className="password-eye"
              xmlns="http://www.w3.org/2000/svg"
              height="10"
              width="12"
              viewBox="0 0 576 512"
              onClick={togglePasswordVisibility}
              style={{
                opacity: isPasswordVisible ? 1 : 0.3,
              }}
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          </div>
        </div>
        <button className="button-auth" type="submit" onClick={onLogin}>
          {translations[language as keyof typeof translations].login}
        </button>

        <div className="login-question">
          {translations[language as keyof typeof translations].dontHaveAccount}
        </div>
        <LanguageSwitchButton />
        <Link className="nav-page" to="/register">
          {translations[language as keyof typeof translations].signUp}
        </Link>
        {auth.currentUser !== null ? <Link to="/profile">Profile</Link> : <></>}
      </form>
    </div>
  );
}

export default Login;
