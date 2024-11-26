import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
// import logo from "../assets/logo.png";
const SplashPage = () => {
  let registered
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5005/users")
      .then((response) => response.data)
      .then(({data}) => {
       data.map((user) => {
        if(!user.user_name) {
          registered = false;
        } else registered = true;
       })
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
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
