import React from "react";
import Navbar from "./Navbar";
import Calendar from "./Calendar";
import firebase from "./Firebase";
import Firestore from "firestore";
import app from "./Firebase";

const Home = () => {
  return (
    <>
      <div>
        <Calendar />
      </div>
    </>
  );
};

export default Home;
