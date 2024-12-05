import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MessageContext } from "../contexts/MessageContext";

const ProfilePage = () => {
  const { userId } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null); // Initialize with null
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUserId } = useContext(AuthContext);
  const { setMessage, setShowDeleteMessage } = useContext(MessageContext);
  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:5005/user")
        .then((response) => {
          const data = response.data;
          const user = data.find((oneUser) => String(oneUser.id) === String(userId));
          setCurrentUser(user || {}); // Fallback to an empty object if no user is found
          setImageUrl(user.image_url);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  function handleLogout() {
    setLoggedIn(false);
    setUserId(null);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    navigate("/");
  }

  function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5005/user/${userId}`)
        .then(({ data }) => {
          console.log("Delete successful", data);
          setMessage("Profile deleted.");
          setShowDeleteMessage(true);
          setTimeout(() => {
            setMessage("");
            setShowDeleteMessage(false);
          }, 3000);
          handleLogout();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleAddImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "Exhibitly");
    axios
      .post("https://api.cloudinary.com/v1_1/dj6l8ij7d/image/upload", formData)
      .then((res) => {
        setImageUrl(res.data.url);
        console.log("Image url:", res.data.url);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .patch(`http://localhost:5005/user/${userId}`, { image_url: imageUrl })
      .then(({ data }) => {
        // console.log("Image added to user");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageUrl]);

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
      {imageUrl && <img src={imageUrl} className="profileImage" />}
      <form onSubmit={handleAddImage}>
        <p>Profile Image</p>
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
        <button className="btn-dark">Upload</button>
      </form>
      {loggedIn ? (
        <>
          <button className="btn-light" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn-alarm" onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <Link to="/">
          <button className="btn-light">Login</button>
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
