import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useCookies } from "react-cookie";
 
const ProtectedRoute = ({ children, accessBy }) => {
  const [cookies, setCookie] = useCookies(["token"]);
 
  if (accessBy === "non-authenticated") {
    if (!cookies.token) {
      return children;
    }
  } else if (accessBy === "authenticated") {
    if (cookies.token) {
      return children;
    }
  }
  return <Navigate to="/"></Navigate>;
};
export default ProtectedRoute;