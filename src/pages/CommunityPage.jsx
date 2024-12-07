import { useState, useEffect } from "react";
import { API_URL } from "../config/apiConfig";
import axios from "axios";

const CommunityPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/user`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  return (
    <div id="community-container">
      <h1>Community</h1>
      <h2>Discover other users' collections</h2>

      {/* <CustomFileInput
        className="my-custom-file-input"
        style={{ marginBottom: '1rem' }}
        onChange={handleFileChange}
      /> */}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div id="users-list">
          {users.map(user => (
            <div key={user.id} className="community-user-card">
              <img className='community-user-image' src={user.image_url} />
              <h3>{user.user_name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
