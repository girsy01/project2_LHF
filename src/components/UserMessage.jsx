import { useContext } from "react";
import { MessageContext } from "../contexts/MessageContext";

const UserMessage = () => {
  const { showDeleteMessage, message } = useContext(MessageContext);

  return <>{showDeleteMessage && <div className="userMessage">{message}</div>}</>;
};
export default UserMessage;
