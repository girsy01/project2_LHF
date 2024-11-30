import ItemCard from "../components/ItemCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5005/user").then((response) => {
      const data = response.data;

      const user = data.find(
        (oneUser) => String(oneUser.id) === String(userId)
      );

      setCurrentUser(user);
    });
  }, [userId]);

  

  return (
    <div className="dashboardPage">
      <div className="wrapper">
        <h1>Exhibitly</h1>
        <h2>Your unique gallery of favorites.</h2>

        {/* Movies */}
        {currentUser.movies && (
          <div className="card-container">
            {/* <h3>Movies</h3> */}
            {currentUser.movies.map((movie, index) => (
              <ItemCard key={index} category="movie" item={movie} />
            ))}
          </div>
        )}

        {/* Books */}
        {currentUser.books && (
          <div className="card-container">
            {/* <h3>Books</h3> */}
            {currentUser.books.map((book, index) => (
              <ItemCard key={index} category="book" item={book} />
            ))}
          </div>
        )}

        {/* Music */}
        {currentUser.music && (
          <div className="card-container">
            {/* <h3>Music</h3> */}
            {currentUser.music.map((music, index) => (
              <ItemCard key={index} category="music" item={music} />
            ))}
          </div>
        )}

        {/* Events */}
        {currentUser.events && (
          <div className="card-container">
            {/* <h3>Events</h3> */}
            {currentUser.events.map((event, index) => (
              <ItemCard key={index} category="event" item={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;