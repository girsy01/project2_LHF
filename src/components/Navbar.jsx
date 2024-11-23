import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <Link>
          <img src={logo} alt="" />
        </Link>

        <div>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "selected" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="#" className={({ isActive }) => (isActive ? "selected" : "")}>
            Add Item
          </NavLink>
          <NavLink to="#" className={({ isActive }) => (isActive ? "selected" : "")}>
            About
          </NavLink>
          <img className="img-profile" src="" />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
