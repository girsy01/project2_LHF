import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const MessageContext = createContext();

const MessageWrapper = ({ children }) => {
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const showSuccessMessage = (event, userId) => {
    if (event === "delete") setMessage("Item deleted");
    else if (event === "add") setMessage("Item added");
    setShowDeleteMessage(true);
    setTimeout(() => {
      setMessage("");
      setShowDeleteMessage(false);
    }, 3000);
    navigate(`/dashboard/${userId}`);
  };

  return (
    <MessageContext.Provider
      value={{ showDeleteMessage, setShowDeleteMessage, message, setMessage, showSuccessMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageWrapper };
