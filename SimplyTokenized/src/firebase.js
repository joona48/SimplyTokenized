// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAas2BEBnA2IsBHwCS4-xlCzSaLxtiih04",
  authDomain: "simplytokenized-741d7.firebaseapp.com",
  projectId: "simplytokenized-741d7",
  storageBucket: "simplytokenized-741d7.appspot.com", // Fix typo: `.app` → `.appspot.com`
  messagingSenderId: "762564202076",
  appId: "1:762564202076:web:af62f87fb4091136c3a099"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
