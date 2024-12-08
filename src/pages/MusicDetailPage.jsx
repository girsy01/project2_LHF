import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import { MessageContext } from "../contexts/MessageContext";

const MusicDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});
  const { showSuccessMessage } = useContext(MessageContext);

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find((oneUser) => String(oneUser.id) === String(userId));
      const item = user.music.find((oneMusic) => String(oneMusic.id) === String(itemId));
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleDelete() {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      const prevMusic = response.data.music || [];

      const updated = {
        id: `${userId}`,
        music: prevMusic.filter((music) => String(music.id) !== String(itemId)),
      };

      await axios.patch(`${API_URL}/user/${userId}`, updated);
      // alert("Book Deleted Sucessfully!");
      showSuccessMessage("delete", userId);
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="itemDetails">
      <img src={currentItem.album_cover} />
      <div className="textDetails">
        <h1>{currentItem.band_name}</h1>
        <h2>Released in: {currentItem.release_date}</h2>
        <p>{currentItem.overview}</p>
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    </div>
  );
};
export default MusicDetailPage;
