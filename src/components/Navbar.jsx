import logo from "../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import userImage from "../assets/user.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { loggedIn, userId, imageUrl } = useContext(AuthContext);

  // Using this to check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getNavLinkClass = (isActive, shouldApplySplash) => {
    let classes = isActive ? "selected" : "";
    if (!loggedIn && shouldApplySplash) {
      classes += " splash";
    }
    return classes.trim();
  };

  const NavLinks = () => (
    <>
      <NavLink
        to={`/dashboard/${userId}`}
        className={({ isActive }) => getNavLinkClass(isActive, true)}
        onClick={() => setIsMenuOpen(false)}
      >
        Dashboard
      </NavLink>
      <NavLink 
        to={`/search`} 
        className={({ isActive }) => getNavLinkClass(isActive, true)}
        onClick={() => setIsMenuOpen(false)}
      >
        Add Item
      </NavLink>
      <NavLink 
        to="/community" 
        className={({ isActive }) => getNavLinkClass(isActive, true)}
        onClick={() => setIsMenuOpen(false)}
      >
        Community
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => getNavLinkClass(isActive, false)}
        onClick={() => setIsMenuOpen(false)}
      >
        About
      </NavLink>
      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
        <div className={`img-profile ${loggedIn && "logged-in"}`}>
          <img
            src={imageUrl ? imageUrl : userImage}
            className={imageUrl && "img-photo"}
            alt="User Profile"
          />
        </div>
      </Link>
    </>
  );

  return (
    <nav>
      <div className="wrapper">
        <Link to={loggedIn && userId ? `/dashboard/${userId}` : "/"}>
          <img src={logo} alt="Logo" />
        </Link>

        {isMobile ? (
          <>
            <div 
              className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            {isMenuOpen && (
              <div className="mobile-menu">
                <NavLinks />
              </div>
            )}
          </>
        ) : (
          <div className="menu">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;