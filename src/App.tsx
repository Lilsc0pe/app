import React from 'react';
import './App.css'; // Предполагаем, что у вас есть файл стилей App.css
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/login"; 
import Register from "./components/registration/registeration";
import Profile from "./components/profile/profile";
import EditProfile from "./components/profile/editProfile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/edit-profile" element={<EditProfile/>} />
      </Routes>
    </Router>
  );
};

export default App;
