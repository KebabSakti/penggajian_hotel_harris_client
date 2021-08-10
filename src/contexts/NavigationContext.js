import React, { useState, createContext } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [path, setPath] = useState("/");

  return (
    <NavigationContext.Provider value={[path, setPath]}>
      {children}
    </NavigationContext.Provider>
  );
};
