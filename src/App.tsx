import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/registration/registeration";
import Profile from "./components/profile/profile";
import EditProfile from "./components/profile/editProfile";
import Home from "./components/home/home";
import Аnnounce from "./components/announcement/announce";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/announce" element={<Аnnounce />} />
      </Routes>
    </Router>
  );
};

export default App;
