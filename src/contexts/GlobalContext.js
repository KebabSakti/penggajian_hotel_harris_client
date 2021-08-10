import React, { useState, createContext, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [path, setPath] = useState("/");

  const LOCAL_STORAGE_KEY = "myapp.auth";

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    setIsAuth(status.isAuth);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ isAuth: isAuth }));
  }, [isAuth]);

  function login() {
    setIsAuth(true);
  }

  function logout() {
    setIsAuth(false);
  }

  console.log("rendered");

  return (
    <GlobalContext.Provider value={[isAuth, login, logout, path, setPath]}>
      {children}
    </GlobalContext.Provider>
  );
};
