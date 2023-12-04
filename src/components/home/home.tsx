import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./home.css"

function Home() {
  return <div>Привет, это домашняя страница!</div>;
  };
 
 
 
 export default Home;
