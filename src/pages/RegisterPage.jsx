import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import { MessageContext } from "../contexts/MessageContext";

const RegisterPage = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { showSuccessMessage } = useContext(MessageContext);

  function handleSubmit(e) {
    e.preventDefault();
    axios.get(`${API_URL}/user`).then((response) => {
      const userExists = response.data.some((user) => user.user_name === newUsername);
      if (userExists) {
        alert("Username already in use!");
      } else {
        const newUser = {
          user_name: newUsername,
          password: newPassword,
          movies: [],
          books: [],
          music: [],
          events: [],
        };

        axios.post(`${API_URL}/user`, newUser);
        showSuccessMessage("register");
        navigate("/");
      }
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={newUsername}
            required
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button className="btn-dark">Register</button>
      </form>
    </div>
  );
};
export default RegisterPage;
