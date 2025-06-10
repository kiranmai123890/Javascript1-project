
  // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgEq5iB6Dvg1LT88agmZCgYcu5KUSM1_s",
  authDomain: "sign-24590.firebaseapp.com",
  projectId: "sign-24590",
  storageBucket: "sign-24590.appspot.com",
  messagingSenderId: "766190092223",
  appId: "1:766190092223:web:d9e0276fe64d9ec04beb0a",
  measurementId: "G-R5PTRLEKL2"
};

const firebaseApp = initializeApp(firebaseConfig);
export const authentication = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);


  