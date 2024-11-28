import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const UIKitPage = () => {
  return (
    <div id="UIKitPage">
      <h1>All UI elements</h1>

      <hr />

      <h2>Navbar:</h2>
      <div>
        <Navbar />
      </div>

      <hr />

      <h2>Buttons:</h2>
      <div>
        <Link to="#">
          <button className="btn-light">Details</button>
        </Link>
        <Link to="#">
          <button className="btn-dark">Details</button>
        </Link>
      </div>

      <hr />

      <h2>Search Bar:</h2>
      <SearchBar />

      <hr />

      <h2>Item Cards:</h2>
      <div className="card-container">
        <ItemCard category={"movie"} />
        <ItemCard category={"book"} />
        <ItemCard category={"music"} />
        <ItemCard category={"event"} />
      </div>

      <hr />

      <h2>Form:</h2>
      <div>
        <form>
          <h2>Edit item</h2>
          <label>Title:</label>
          <input type="text" />

          <label>Rating:</label>
          <input type="number" />

          <label for="gender">Category:</label>
          <select id="gender" name="gender">
            <option value="" disabled selected>
              Select category
            </option>
            <option value="movie">Movie</option>
            <option value="book">Book</option>
            <option value="music">Music</option>
          </select>

          <button className="btn-dark">Save changes</button>
        </form>
      </div>
    </div>
  );
};
export default UIKitPage;
