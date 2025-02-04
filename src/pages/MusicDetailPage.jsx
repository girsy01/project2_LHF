import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import { MessageContext } from "../contexts/MessageContext";

const MusicDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
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

  async function handleAddNote(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);

      const prevMusic = response.data.music || [];
      const updatedMusic = prevMusic.map((music) =>
        music.id === currentItem.id ? { ...music, notes: note } : music
      );

      const updated = {
        id: `${userId}`,
        music: updatedMusic,
      };

      await axios.patch(`${API_URL}/user/${userId}`, updated);
      alert("Note Added Sucessfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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
    <div className="wrapper">
      <div id="itemDetails">
        <div className="textDetails">
          <h1>{currentItem.band_name}</h1>
          <p>Released in: {currentItem.release_date}</p>
          <img src={currentItem.album_cover} />
          <p>{currentItem.overview}</p>
          <h3>Notes:</h3>
          <p>{currentItem.notes || "No notes added"}</p>
          <form onSubmit={handleAddNote}>
            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
            <button className="btn-dark">Add Note</button>
          </form>
          <button onClick={handleDelete}>Delete Item</button>
        </div>
      </div>
    </div>
  );
};
export default MusicDetailPage;
