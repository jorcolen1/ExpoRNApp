
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
  apiKey: 'AIzaSyCGTMiYdR4dsHjZ31XhEa298s4T1DNyP-w',
  authDomain: 'eventicket-ee2d5.firebaseapp.com',
  projectId: 'eventicket-ee2d5',
  storageBucket: 'eventicket-ee2d5.appspot.com',
  messagingSenderId: '1000180412603',
  appId: '1:1000180412603:web:ca557ec3a95b92c3a1b99e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)