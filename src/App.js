import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Meet from "./Components/Meet";

import Signup from "./Components/Signup";
import SinauMeet from "./Components/SinauMeet";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Signup"
            element={
              <ProtectedRoute accessBy="non-authenticated">
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute accessBy="authenticated">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Meet"
            element={
              <ProtectedRoute accessBy="authenticated">
                <Meet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SinauMeet"
            element={
              <ProtectedRoute accessBy="authenticated">
                <SinauMeet />
              </ProtectedRoute>
            }
          />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
