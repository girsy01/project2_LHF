import ItemCard from "../components/ItemCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import IconFilterItem from "../components/IconFilterItem";
import { FilterContext } from "../contexts/FilterContext";

const DashboardPage = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  // JUST FOR NOW UNTIL WE HAVE THE REAL DATA
  const [myItems, setMyItems] = useState([]);
  useEffect(() => {
    setMyItems([
      { category: "movie" },
      { category: "book" },
      { category: "music" },
      { category: "event" },
    ]);
  }, []);

  const { categoryFilter, setCategoryFilter } = useContext(FilterContext);

  useEffect(() => {
    axios.get("http://localhost:5005/user").then((response) => {
      const data = response.data;

      const user = data.find((oneUser) => String(oneUser.id) === String(userId));

      setCurrentUser(user);
    });
  }, [userId]);

  return (
    <div className="dashboardPage">
      <div className="wrapper">
        <h1>Exhibitly</h1>
        <h2>Your unique gallery of favorites.</h2>

        <div className="icons-container">
          <IconFilterItem category={"movie"} />
          <IconFilterItem category={"book"} />
          <IconFilterItem category={"music"} />
          <IconFilterItem category={"event"} />
          <IconFilterItem category={"all"} />
        </div>

        {/* Movies */}
        {currentUser.movies && (
          <div className="card-container">
            {/* <h3>Movies</h3> */}
            {currentUser.movies.map((movie, index) => (
              <ItemCard key={index} category="movie" item={movie} />
            ))}
            {currentUser.books.map((book, index) => (
              <ItemCard key={index} category="book" item={book} />
            ))}
            {currentUser.music.map((music, index) => (
              <ItemCard key={index} category="music" item={music} />
            ))}
            {currentUser.events.map((event, index) => (
              <ItemCard key={index} category="event" item={event} />
            ))}
          </div>
        )}

        {/* <div className="card-container">
          {myItems
            .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
            .map((item) => (
              <ItemCard category={item.category} />
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
