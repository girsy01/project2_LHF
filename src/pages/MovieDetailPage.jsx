import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "../config/apiConfig";
import { MessageContext } from "../contexts/MessageContext";

const MovieDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});
  const { showSuccessMessage } = useContext(MessageContext);

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find((oneUser) => String(oneUser.id) === String(userId));
      const item = user.movies.find((oneMovie) => String(oneMovie.id) === String(itemId));
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleDelete() {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      const prevMovies = response.data.movies || [];

      const updated = {
        id: `${userId}`,
        movies: prevMovies.filter((movie) => String(movie.id) !== String(itemId)),
      };

      await axios.patch(`${API_URL}/user/${userId}`, updated);
      // alert("Movie Deleted Sucessfully!");
      showSuccessMessage("delete", userId);
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="itemDetails">
      <img src={currentItem.cover} />
      <div className="textDetails">
        <h1>{currentItem.title}</h1>
        <h2>Year: {currentItem.year}</h2>
        <p>
          <em>Synopsis:</em> {currentItem.overview}
        </p>
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    </div>
  );
};
export default MovieDetailPage;
