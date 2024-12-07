import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BookDetailPage = () => {
  const { userId, itemId } = useParams();

  const [currentItem, setCurrentItem] = useState({});
  
  useEffect(() => {
    axios.get("http://localhost:5005/user").then((response) => {
      const data = response.data;
      const user = data.find(
        (oneUser) => String(oneUser.id) === String(userId)
      );
      const item = user.books.find(
        (oneBook) => String(oneBook.id) === String(itemId)
      );
      setCurrentItem(item);
    });
  }, [userId, itemId]);

  return (
    <div id="itemDetails">
      <img src={currentItem.book_cover} />
      <div className="textDetails">
        <h1>{currentItem.book_title}</h1>
        <h2>Published in : {currentItem.published_date}</h2>
        <p><em>Summary :</em> {currentItem.summary}</p>
      </div>
    </div>
  );
};
export default BookDetailPage;
