// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-3f762.firebaseapp.com",
  projectId: "mern-estate-3f762",
  storageBucket: "mern-estate-3f762.appspot.com",
  messagingSenderId: "332412846717",
  appId: "1:332412846717:web:5fcc8fd6884f9dd51fa714"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);