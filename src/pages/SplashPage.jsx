import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import logo from "../assets/logo.png";
const SplashPage = () => {
  let registered;
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5005/user")
      .then((response) => {
        const users = response.data;
        const foundUser = users.find((user) => user.user_name === username);

        if (foundUser) {
          navigate(`/dashboard/${foundUser.id}`);
        } else {
          navigate("/register");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      {/* <img src={logo} alt="" /> */}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button>Login</button>
      </form>
    </div>
  );
};
export default SplashPage;
