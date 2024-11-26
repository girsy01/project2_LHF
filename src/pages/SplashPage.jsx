import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
const SplashPage = () => {
  const registered = true;
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
    </div>
  );
};
export default SplashPage;
