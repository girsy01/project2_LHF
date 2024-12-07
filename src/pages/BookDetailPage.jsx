import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/apiConfig";

const BookDetailPage = () => {
  const { userId, itemId } = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      const data = response.data;
      const user = data.find((oneUser) => String(oneUser.id) === String(userId));
      const item = user.books.find((oneBook) => String(oneBook.id) === String(itemId));
      setCurrentItem(item);
    });
  }, [userId, itemId]);

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
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    </div>
  );
};
export default BookDetailPage;
