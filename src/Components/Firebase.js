import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbujcGi2d-S3ib1tqBhMn-lgpJw525Voo",
  authDomain: "sinaustudio-2e747.firebaseapp.com",
  databaseURL:
    "https://sinaustudio-2e747-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sinaustudio-2e747",
  storageBucket: "sinaustudio-2e747.appspot.com",
  messagingSenderId: "225301022100",
  appId: "1:225301022100:web:a2051f00f0282bdbdfbb81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
