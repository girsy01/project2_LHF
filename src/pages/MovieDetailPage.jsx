import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "../config/apiConfig";
import { MessageContext } from "../contexts/MessageContext";

const MovieDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});
  const [note, setNote] = useState("");
  const { showSuccessMessage } = useContext(MessageContext);

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find((oneUser) => String(oneUser.id) === String(userId));
      const item = user.movies.find((oneMovie) => String(oneMovie.id) === String(itemId));
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleAddNote(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);

      const prevMovies = response.data.movies || [];
      const updatedMovies = prevMovies.map((movie) =>
        movie.id === currentItem.id ? { ...movie, notes: note } : movie
      );

      const updated = {
        id: `${userId}`,
        movies: updatedMovies,
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
    <div className="wrapper">
      <div id="itemDetails">
        <div className="textDetails">
          <h1>{currentItem.title}</h1>
          <p>Year: {currentItem.year}</p>
          <img src={currentItem.cover} />
          {currentItem.overview && (
            <>
              <h3>Synopsis:</h3>
              <p>{currentItem.overview}</p>
            </>
          )}

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

export default MovieDetailPage;
