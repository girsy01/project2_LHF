import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const MovieDetailPage = () => {
  const { userId, itemId } = useParams();

  const [currentItem, setCurrentItem] = useState({});
  console.log(itemId);
  useEffect(() => {
    axios.get("http://localhost:5005/user").then((response) => {
      const data = response.data;
      const user = data.find(
        (oneUser) => String(oneUser.id) === String(userId)
      );
      const item = user.movies.find(
        (oneMovie) => String(oneMovie.id) === String(itemId)
      );
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  return (
    <div>
      <img src={currentItem.cover} />
      <div>
        <h1>{currentItem.title}</h1>
        <p>{currentItem.description}</p>
      </div>
    </div>
  );
};
export default MovieDetailPage;
