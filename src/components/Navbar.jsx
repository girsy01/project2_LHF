import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import userImage from "../assets/user.png"; // Import the user image

const Navbar = () => {
  const { userId } = useParams();
  const location = useLocation();
  const isSplashPage = location.pathname === "/";

  const getNavLinkClass = (isActive, shouldApplySplash) => {
    let classes = isActive ? "selected" : "";
    if (isSplashPage && shouldApplySplash) {
      classes += " splash";
    }
    return classes.trim();
  };

  return (
    <nav>
      <div className="wrapper">
        {/* Dynamically set the link based on whether the user is on the splash page */}
        <Link to={isSplashPage ? "/" : `/dashboard/${userId}`}>
          <img src={logo} alt="Logo" />
        </Link>

        <div className="menu">
          {/* TODO: add real userId here */}
          <NavLink
            to={`/dashboard/${userId}`}
            className={({ isActive }) => getNavLinkClass(isActive, true)}
          >
            Dashboard
          </NavLink>
          <NavLink to={`/search`} className={({ isActive }) => getNavLinkClass(isActive, true)}>
            Add Item
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => getNavLinkClass(isActive, false)}>
            About
          </NavLink>
          <Link to="#">
            <div className="img-profile">
              <img src={userImage} alt="User Profile" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
