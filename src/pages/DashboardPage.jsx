import ItemCard from "../components/ItemCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import IconFilterItem from "../components/IconFilterItem";
import { FilterContext } from "../contexts/FilterContext";

const DashboardPage = () => {
  // const { userId } = useContext(AuthContext);
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  const { categoryFilter, setCategoryFilter } = useContext(FilterContext);

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

  useEffect(() => {
    axios.get("http://localhost:5005/user").then((response) => {
      const data = response.data;

      const user = data.find(
        (oneUser) => String(oneUser.id) === String(userId)
      );

      setCurrentUser(user);
    });
  }, [userId]);

  function checkCategory(cat) {
    if (categoryFilter === "all" || categoryFilter === cat) return true;
    return false;
  }

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
            {checkCategory("movie") &&
              currentUser.movies.map((movie) => (
                <Link to={`/${userId}/moviedetail/${movie.id}`} key={movie.id}>
                  <ItemCard category="movie" item={movie} itemId={movie.id} />
                </Link>
              ))}
            {checkCategory("book") &&
              currentUser.books.map((book) => (
                <Link to={`/${userId}/bookdetail/${book.id}`} key={book.id}>
                  <ItemCard category="book" item={book} itemId={book.id} />
                </Link>
              ))}
            {checkCategory("music") &&
              currentUser.music.map((music) => (
                <Link to={`/${userId}/musicdetail/${music.id}`} key={music.id}>
                  <ItemCard category="music" item={music} />
                </Link>
              ))}
            {checkCategory("event") &&
              currentUser.events.map((event) => (
                <Link to={`/${userId}/eventdetail/${event.id}`} key={event.id}>
                  <ItemCard category="event" item={event} />
                </Link>
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
