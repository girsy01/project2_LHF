import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import userImage from "../assets/user.png"; // Import the user image

const Navbar = () => {
  https: return (
    <nav>
      <div className="wrapper">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <div className="menu">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "selected" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/addInterest" className={({ isActive }) => (isActive ? "selected" : "")}>
            Add Item
          </NavLink>
          <NavLink to="#" className={({ isActive }) => (isActive ? "selected" : "")}>
            About
          </NavLink>
          <Link>
            <div className="img-profile">
              <img src={userImage} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
