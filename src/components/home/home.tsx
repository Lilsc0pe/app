import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import the CSS file

function Home() {
  return (
    <div className="container">
      <div className="navbar">
        <Link to="/announcements">Announcements</Link>
        <Link to="/news">News</Link>
        <Link to="/register" className="right">Registration</Link>
        <Link to="/login" className="right">Login</Link>
      </div>

      <div className="main-content">
        <h2>POPULAR ANNOUNCEMENTS</h2>
        <div className="announcement"></div>
        <div className="announcement"></div>
      </div>
    </div>
  );
}

export default Home;





