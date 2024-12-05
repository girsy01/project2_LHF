import { createContext, useState } from "react";

const MessageContext = createContext();

const MessageWrapper = ({ children }) => {
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider
      value={{ showDeleteMessage, setShowDeleteMessage, message, setMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageWrapper };
