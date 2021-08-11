import React, { useState, createContext, useEffect } from "react";
import { loginAuth, logoutAuth, checkAuth } from "../api/Auth";
import { message, notification } from "antd";

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

  async function check() {
    try {
      await checkAuth();
    } catch (e) {
      if (e.response.status === 401 || e.response.status === 419) {
        notification.warning({
          message: "Sesi anda telah berakhir, login kembali untuk melanjutkan",
        });
        setUser(null);
      } else {
        message.error(e.message);
      }
    }
  }

  async function logout() {
    const response = await logoutAuth();

    setUser(null);

    return response;
  }

  return (
    <AuthContext.Provider value={[user, login, logout, check]}>
      {children}
    </AuthContext.Provider>
  );
};
