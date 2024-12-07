import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MusicDetailPage = () => {
  const { userId, itemId } = useParams();
    const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5005/user").then((response) => {
      const data = response.data;
      const user = data.find(
        (oneUser) => String(oneUser.id) === String(userId)
      );
      const item = user.music.find(
        (oneMusic) => String(oneMusic.id) === String(itemId)
      );
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleDelete() {
    try {
      const response = await axios.get(
        `http://localhost:5005/user/${userId}`
      );
      const prevMusic = response.data.music || [];

      const updated = {
        id: `${userId}`,
        music: prevMusic.filter((music) => String(music.id) !== String(itemId))
      }

      await axios.patch(`http://localhost:5005/user/${userId}`, updated);
      alert("Music Deleted Sucessfully!");
      navigate(`/dashboard/${userId}`)      
    } catch (error) {console.log(error)}
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
