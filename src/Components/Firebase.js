import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

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

async function InsertToFirestore(avg) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      avg: avg,
    });
    console.log("Document written with ID: ", docRef.id);
    console.log("berhasilllllll");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default InsertToFirestore;
