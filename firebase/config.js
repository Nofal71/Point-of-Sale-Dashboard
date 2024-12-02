// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnlydV8nWXue05kU_pypJuTdHJtjjKc4A",
  authDomain: "react-dashboard-9efb0.firebaseapp.com",
  projectId: "react-dashboard-9efb0",
  storageBucket: "react-dashboard-9efb0.firebasestorage.app",
  messagingSenderId: "505975569467",
  appId: "1:505975569467:web:0c554e859cfaf0cc38f01e",
  measurementId: "G-FPES02NSG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);