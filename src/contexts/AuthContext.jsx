import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check localStorage for the initial loggedIn state
    const savedLoggedIn = localStorage.getItem("loggedIn");
    return savedLoggedIn === "true";
  });

  const [userId, setUserId] = useState(() => {
    // Check localStorage for the initial userId state
    return localStorage.getItem("userId") || null;
  });

  // Update localStorage whenever loggedIn changes
  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  // Update localStorage whenever userId changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId"); // Remove userId if null
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
