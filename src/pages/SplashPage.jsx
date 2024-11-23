import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const SplashPage = () => {
  const registered = true;
  return (
    <div>
      <img src={logo} alt="" />
      <form>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      </form>
      <Link to={`${registered ? "/dashboard" : "/register"}`}>
        <button>Login</button>
      </Link>
    </div>
  );
};
export default SplashPage;
