import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API_URL } from "../config/apiConfig";
import axios from "axios";
import { MessageContext } from "../contexts/MessageContext";

const EventDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});
  const [note, setNote] = useState("")
  const { showSuccessMessage } = useContext(MessageContext);

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find(
        (oneUser) => String(oneUser.id) === String(userId)
      );
      const item = user.events.find(
        (oneEvent) => String(oneEvent.id) === String(itemId)
      );
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleAddNote(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);

      const prevEvents = response.data.events || [];
      const updatedEvents = prevEvents.map((event) =>
        event.id === currentItem.id ? { ...event, notes: note } : event
      );

      const updated = {
        id: `${userId}`,
        events: updatedEvents,
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
      const prevEvents = response.data.events || [];

      const updated = {
        id: `${userId}`,
        events: prevEvents.filter(
          (event) => String(event.id) !== String(itemId)
        ),
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
        <p>
          <em>Note:</em> {currentItem.notes || "No notes added"}
        </p>
        <form onSubmit={handleAddNote}>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="btn-light">Add Note</button>
        </form>
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    </div>
  );
};
export default EventDetailPage;
