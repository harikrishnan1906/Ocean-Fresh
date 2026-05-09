import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import API from "../services/api";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await API.get("/auth/me");

      setUser(response.data);
      return response.data || false;
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
        return null;
      }
      setUser(null);
      console.log("check auth useEffect", err);
      return null;
    }
  };

  const login = (userData, jwtToken) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
