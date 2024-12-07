import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API_URL } from "../config/apiConfig";
import axios from "axios";
import { MessageContext } from "../contexts/MessageContext";

const EventDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});
  const { showSuccessMessage } = useContext(MessageContext);

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find((oneUser) => String(oneUser.id) === String(userId));
      const item = user.events.find((oneEvent) => String(oneEvent.id) === String(itemId));
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleDelete() {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      const prevEvents = response.data.events || [];

      const updated = {
        id: `${userId}`,
        events: prevEvents.filter((event) => String(event.id) !== String(itemId)),
      };

      await axios.patch(`${API_URL}/user/${userId}`, updated);
      // alert("Event Deleted Sucessfully!");
      showSuccessMessage("delete", userId);
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="itemDetails">
      <img src={currentItem.event_cover} />
      <div className="textDetails">
        <h1>{currentItem.event_name}</h1>
        <p>{currentItem.overview}</p>
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    </div>
  );
};
export default EventDetailPage;
