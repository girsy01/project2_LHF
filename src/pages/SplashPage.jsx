import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
// import logo from "../assets/logo.png";
const SplashPage = () => {
  let registered
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5005/users")
      .then((response) => setUsers(response.data))
      .then(users.map((user) => {
        if(!user.user_name) {
          navigate("/register")
        }else navigate(`/dashboard/${user.id}`)
      })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      {/* <img src={logo} alt="" /> */}
      <form>
        <label>Username:</label>
        <input type="text" />

        <label>Password:</label>
        <input type="password" />

        <Link to={`${registered ? "/dashboard" : "/register"}`}>
          <button className="btn-dark">Login</button>
        </Link>
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="user"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
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
