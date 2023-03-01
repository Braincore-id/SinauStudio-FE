
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Meet from "./Components/Meet";

import Signup from "./Components/Signup";
import SinauMeet from "./Components/SinauMeet";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Meet" element={<Meet/>}/>
        </Routes>
      </Router>

    </>
  );
}

export default App;
