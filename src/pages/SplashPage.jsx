import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
// import logo from "../assets/logo.png";

const SplashPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setLoggedIn, setUserId } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5005/user")
      .then((response) => {
        const users = response.data;
        const foundUser = users.find((user) => user.user_name === username);
        const userPassword = foundUser.password;

        if (foundUser && String(userPassword) === String(password)) {
          // Update context and localStorage
          setLoggedIn(true);
          setUserId(foundUser.id);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("userId", foundUser.id);

          // Redirect to dashboard
          navigate(`/dashboard/${foundUser.id}`);
        } else if (!foundUser || userPassword !== password) {
          alert("Incorrect Credentials");
          setUsername("");
          setPassword("");
        } else {
          navigate("/register");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="splash-page">
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

        <button className="btn-dark">Login</button>
      </form>
      <Link to="/register">
        <h2>No account yet?</h2>
        <button className="btn-light">Register</button>
      </Link>
    </div>
  );
};
export default SplashPage;
