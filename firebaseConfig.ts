// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc1gOo1b5JEngoYlD_2VQWVC40-1-X9G8",
  authDomain: "marketplace-24735.firebaseapp.com",
  projectId: "marketplace-24735",
  storageBucket: "marketplace-24735.appspot.com",
  messagingSenderId: "410072416248",
  appId: "1:410072416248:web:18a02bdce65ad33c33a00d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);