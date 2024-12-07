import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventDetailPage = () => {
    const { userId, itemId } = useParams();

    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
      axios.get("http://localhost:5005/user").then((response) => {
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
  
    return (
      <div id="itemDetails">
        <img src={currentItem.event_cover} />
        <div className="textDetails">
          <h1>{currentItem.event_name}</h1>
          <p>{currentItem.overview}</p>
        </div>
      </div>
    );
}
export default EventDetailPage