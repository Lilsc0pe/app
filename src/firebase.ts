import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx9hYHdEGyL2GVtx98XM4NXpoklm7yLbQ",
  authDomain: "carservice-3fe5d.firebaseapp.com",
  projectId: "carservice-3fe5d",
  storageBucket: "carservice-3fe5d.appspot.com",
  messagingSenderId: "339922875396",
  appId: "1:339922875396:web:1554c31e49f0407fc73151",
  measurementId: "G-T8ZHHMM71V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


