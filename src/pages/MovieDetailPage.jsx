import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const MovieDetailPage = () => {
  const { userId, itemId } = useParams();

  const [currentItem, setCurrentItem] = useState({});
   
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
    <div id="itemDetails">
      <img src={currentItem.cover} />
      <div className="textDetails">
        <h1>{currentItem.title}</h1>
        <h2>Year: {currentItem.year}</h2>
        <p><em>Synopsis:</em> {currentItem.overview}</p>
      </div>
    </div>
  );
};
export default MovieDetailPage;
