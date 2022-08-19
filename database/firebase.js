
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwmfZEINlFE6uzkxvi86XZ_e4F2GcP9nI",
  authDomain: "dentralia.firebaseapp.com",
  projectId: "dentralia",
  storageBucket: "dentralia.appspot.com",
  messagingSenderId: "1050520941734",
  appId: "1:1050520941734:web:609309eecab82ed5eef067",
  measurementId: "G-VPG4088KCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)