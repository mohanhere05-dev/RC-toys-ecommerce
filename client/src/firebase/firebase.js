// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzLwqlp3ai3wCb_PMLEUJHpSzUuFv86Uc",
  authDomain: "turbotoys-21dd6.firebaseapp.com",
  projectId: "turbotoys-21dd6",
  storageBucket: "turbotoys-21dd6.firebasestorage.app",
  messagingSenderId: "30756723474",
  appId: "1:30756723474:web:7fd73016d4c2c3a717b1cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();