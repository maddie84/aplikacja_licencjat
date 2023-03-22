//konfiguracja dla firebase, z którego wykorzystujemy baze danych i autentykacje  

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEL9HGRfFGFQvUDPfVU5eAZ9JJaPSfw8k",
  authDomain: "licencjat2023-8648d.firebaseapp.com",
  projectId: "licencjat2023-8648d",
  storageBucket: "licencjat2023-8648d.appspot.com",
  messagingSenderId: "466561537994",
  appId: "1:466561537994:web:3430d41a7b862b1c16a133"
};

// Initialize Firebase - inicjalizacja aplikacjii

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firestore = getFirestore(app);
