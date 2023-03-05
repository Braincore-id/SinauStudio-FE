import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
    const apiURL =
    "https://a025-2001-448a-2003-6db8-e946-22f3-cf3c-58dd.ap.ngrok.io/api/v.1";
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });
  const navigate = useNavigate();
  const login = async (payload) => {
    await axios
        .post(`${apiURL}/auth/login`, payload, {
      withCredentials: true,
    });
    let apiResponse = await axios.get("http://localhost:4000/user-profile", {
      withCredentials: true,
    });
    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
  };
 
  const logout = async () => {
    await axios.get("http://localhost:4000/logout", { withCredentials: true });
    localStorage.removeItem("userProfile");
    setUser(null);
    navigate("/login");
  };
 
  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
 
export default AuthContext;