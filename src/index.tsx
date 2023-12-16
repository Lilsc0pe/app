import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LanguageProvider } from "./contexts/LanguageContext"; // import LanguageProvider from LanguageContext

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider> {/* Wrap App with LanguageProvider */}
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
export {}; // add this line at the end of the file
