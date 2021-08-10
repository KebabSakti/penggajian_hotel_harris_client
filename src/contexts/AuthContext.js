import React, { useState, createContext, useEffect } from "react";
import { loginAuth, logoutAuth } from "../api/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const STORAGE_KEY = "penggajian.app";

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    setUser(user);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  async function login(username, password) {
    const response = await loginAuth(username, password);

    setUser({ name: response.data.name, email: response.data.email });

    return response;
  }

  async function logout() {
    const response = await logoutAuth();

    setUser(null);

    return response;
  }

  return (
    <AuthContext.Provider value={[user, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
};
