// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr5zZ80nXKF3xTqxLhoPNytv7lne4t-Es",
  authDomain: "automedic-login.firebaseapp.com",
  projectId: "automedic-login",
  storageBucket: "automedic-login.appspot.com",
  messagingSenderId: "511864216225",
  appId: "1:511864216225:web:a2b653399b9a361ef52ee0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
