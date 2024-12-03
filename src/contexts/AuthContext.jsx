import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log("AuthWrapper loggedIn:", loggedIn);

  return <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthWrapper };
