// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFuSDJh30CDeR5AIYH9y4RO7gAvx1LMhY",
  authDomain: "sparta-react-basic-3d061.firebaseapp.com",
  projectId: "sparta-react-basic-3d061",
  storageBucket: "sparta-react-basic-3d061.appspot.com",
  messagingSenderId: "46543366183",
  appId: "1:46543366183:web:a87ce45e77b8f6b604c602",
  measurementId: "G-LJ59515PCP"
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();