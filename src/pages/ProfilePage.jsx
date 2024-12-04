import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null); // Initialize with null
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUserId } = useContext(AuthContext);

  function handleLogout() {
    setLoggedIn(false);
    setUserId(null);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    navigate("/");
  }

  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:5005/user")
        .then((response) => {
          const data = response.data;
          const user = data.find((oneUser) => String(oneUser.id) === String(userId));
          setCurrentUser(user || {}); // Fallback to an empty object if no user is found
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  return (
    <div className="wrapper profilePage">
      <h1>Your Profile</h1>
      {loggedIn ? (
        <h3>
          Logged in as <em>{currentUser ? currentUser.user_name : "Loading..."}</em>
        </h3>
      ) : (
        <h3>Currently not logged in</h3>
      )}
      {loggedIn ? (
        <button className="btn-light" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/">
          <button className="btn-light">Login</button>
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
