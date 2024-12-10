import ItemCard from "../components/ItemCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import IconFilterItem from "../components/IconFilterItem";
import { FilterContext } from "../contexts/FilterContext";
import { API_URL } from "../config/apiConfig";

const DashboardPage = () => {
  // const { userId } = useContext(AuthContext);
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const { categoryFilter, setCategoryFilter } = useContext(FilterContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/user`).then((response) => {
      console.log("Response data:", response.data);
      const data = response.data;

      const user = data.find((oneUser) => String(oneUser.id) === String(userId));

      setCurrentUser(user);
    });
  }, [userId]);

  function checkCategory(cat) {
    if (categoryFilter === "all" || categoryFilter === cat) return true;
    return false;
  }

  function searchFilter(item, category) {
    if (!search) return true;

    let titles = "Untitled";
    if (item) {
      if (category === "book") titles = item.book_title;
      else if (category === "movie") titles = item.title;
      else if (category === "music") titles = item.band_name;
      else if (category === "event") titles = item.event_name;
    }

    return titles.toLowerCase().includes(search.toLowerCase());
  }

  return (
    <div id="dashboardPage" className="dashboardPage">
      <div className="wrapper">
        <h1>Exhibitly</h1>
        <h2>Your unique gallery of favorites.</h2>

        <div className="icons-container">
          <IconFilterItem category={"all"} />
          <IconFilterItem category={"movie"} />
          <IconFilterItem category={"book"} />
          <IconFilterItem category={"music"} />
          <IconFilterItem category={"event"} />
        </div>

        <input
          type="text"
          placeholder="Search for titles..."
          id="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Movies */}
        {currentUser.movies && (
          <div className="card-container">
            {/* <h3>Movies</h3> */}
            {checkCategory("movie") &&
              currentUser.movies
                .filter((item) => searchFilter(item, "movie"))
                .map((movie) => (
                  <Link to={`/${userId}/moviedetail/${movie.id}`} key={movie.id}>
                    <ItemCard category="movie" item={movie} itemId={movie.id} />
                  </Link>
                ))}
            {checkCategory("book") &&
              currentUser.books
                .filter((item) => searchFilter(item, "book"))
                .map((book) => (
                  <Link to={`/${userId}/bookdetail/${book.id}`} key={book.id}>
                    <ItemCard category="book" item={book} itemId={book.id} />
                  </Link>
                ))}
            {checkCategory("music") &&
              currentUser.music
                .filter((item) => searchFilter(item, "music"))
                .map((music) => (
                  <Link to={`/${userId}/musicdetail/${music.id}`} key={music.id}>
                    <ItemCard category="music" item={music} />
                  </Link>
                ))}
            {checkCategory("event") &&
              currentUser.events
                .filter((item) => searchFilter(item, "event"))
                .map((event) => (
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
        <button className="btn-light" onClick={() => navigate("/search")}>
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;