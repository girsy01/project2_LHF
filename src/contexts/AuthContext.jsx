import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  console.log("AuthWrapper loggedIn:", loggedIn);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
