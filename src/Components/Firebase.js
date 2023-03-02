import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-5rzrHKBnuMuihZ-m_oOEUKbg4QQkS4U",
  authDomain: "attention-studio.firebaseapp.com",
  databaseURL:
    "https://attention-studio-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "attention-studio",
  storageBucket: "attention-studio.appspot.com",
  messagingSenderId: "985346975544",
  appId: "1:985346975544:web:b2b44863ae786450c583cd",
  measurementId: "G-6C6PN737XZ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db