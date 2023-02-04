// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpCju4rklFIfdrNXR6J6j7ayAXsW2fK0M",
  authDomain: "resoluteai-pratik-jangam.firebaseapp.com",
  databaseURL: "https://resoluteai-pratik-jangam-default-rtdb.firebaseio.com",
  projectId: "resoluteai-pratik-jangam",
  storageBucket: "resoluteai-pratik-jangam.appspot.com",
  messagingSenderId: "411198146273",
  appId: "1:411198146273:web:f17bb01e984ec00cdc19a0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
export { app, auth, db };
