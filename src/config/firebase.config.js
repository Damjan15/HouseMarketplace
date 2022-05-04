import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1reRvQMtMF8klUteCHL41TTyYoE22HUI",
  authDomain: "housemarketplace-f82ca.firebaseapp.com",
  projectId: "housemarketplace-f82ca",
  storageBucket: "housemarketplace-f82ca.appspot.com",
  messagingSenderId: "921260362381",
  appId: "1:921260362381:web:8664a06718cba37f66f0c4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();