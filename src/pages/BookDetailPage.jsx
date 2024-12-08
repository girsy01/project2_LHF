import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/apiConfig";

const BookDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});
  const [note, setNote] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find((oneUser) => String(oneUser.id) === String(userId));
      const item = user.books.find((oneBook) => String(oneBook.id) === String(itemId));
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  async function handleAddNote(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);

      const prevBooks = response.data.books || [];
      const updatedBooks = prevBooks.map((book) =>
        book.id === currentItem.id
          ? { ...book, notes: note }
          : book
      );

      const updated = {
        id: `${userId}`,
        books: updatedBooks,
      };

      await axios.patch(`${API_URL}/user/${userId}`, updated);
      alert("Note Added Sucessfully!");
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      const prevBooks = response.data.books || [];

      const updated = {
        id: `${userId}`,
        books: prevBooks.filter((book) => String(book.id) !== String(itemId)),
      };

      await axios.patch(`${API_URL}/user/${userId}`, updated);
      alert("Book Deleted Sucessfully!");
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="itemDetails">
      <img src={currentItem.book_cover} />
      <div className="textDetails">
        <h1>{currentItem.book_title}</h1>
        <h2>Published in : {currentItem.published_date}</h2>
        <p>
          <em>Summary :</em> {currentItem.summary}
        </p>
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
export default BookDetailPage;
