import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/endpoints/movieAPI";
import { searchMusic } from "../services/endpoints/musicAPI";
import { searchBooks } from "../services/endpoints/bookAPI";
import { searchEvents } from "../services/endpoints/eventAPI";
import { useMedia } from "../contexts/MediaContext";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../config/apiConfig";
import { MessageContext } from "../contexts/MessageContext";
import axios from "axios";

function generateUniqueId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

const AddInterestPage = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const { showSuccessMessage } = useContext(MessageContext);

  const [formData, setFormData] = useState({
    mediaType: "movie",
    searchParams: {},
  });

  const { searchResults, setSearchResults, loading, setLoading, error, setError } = useMedia();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      searchParams: {
        ...prev.searchParams,
        [name]: value,
      },
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let results;
      switch (formData.mediaType) {
        case "movie":
          results = await searchMovies(formData.searchParams);
          setSearchResults(results);
          console.log("Movie results:", results);
          break;
        case "music":
          results = await searchMusic(formData.searchParams);
          setSearchResults(results);
          console.log("Music results:", results);
          break;
        case "book":
          results = await searchBooks(formData.searchParams);
          setSearchResults(results);
          console.log("Book results:", results);
          break;
        case "event":
          results = await searchEvents(formData.searchParams);
          setSearchResults(results);
          console.log("Event results:", results);
          break;
        default:
          break;
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function handleSave() {
    switch (formData.mediaType) {
      case "music":
        if (selectedItem) {
          console.log(selectedItem);
          try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const prevMusic = response.data.music || [];

            const updated = {
              id: `${userId}`,
              music: [
                ...prevMusic,
                {
                  // id: prevMusic.length + 1,
                  id: generateUniqueId(),
                  band_name: selectedItem.artists[0].name,
                  album_cover: selectedItem.album.images[0].url,
                  release_date: selectedItem.album.release_date.slice(0, 4),
                  overview: selectedItem.overview || "",
                },
              ],
            };

            axios.patch(`${API_URL}/user/${userId}`, updated);
            // alert("Music Added Sucessfully!");
            showSuccessMessage("add", userId);
          } catch {
            (error) => console.log(error);
          }
        } else {
          alert("Please select an item first");
        }
        break;

      case "movie":
        if (selectedItem) {
          console.log(selectedItem);
          try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const prevMovies = response.data.movies || [];

            const updated = {
              id: `${userId}`,
              movies: [
                ...prevMovies,
                {
                  // id: prevMovies.length + 1,
                  id: generateUniqueId(),
                  title: selectedItem.original_title,
                  year: Number(selectedItem.release_date.slice(0, 4)),
                  cover:
                    "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww",
                  overview: selectedItem.overview || "",
                },
              ],
            };

            axios.patch(`${API_URL}/user/${userId}`, updated);
            // alert("Movie Added Sucessfully!");
            showSuccessMessage("add", userId);
            navigate(`/dashboard/${userId}`);
          } catch {
            (error) => console.log(error);
          }
        } else {
          alert("Please select an item first");
        }

        break;

      case "event":
        if (selectedItem) {
          console.log(selectedItem);
          try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const prevEvents = response.data.events || [];

            const updated = {
              id: `${userId}`,
              events: [
                ...prevEvents,
                {
                  // id: prevEvents.length + 1,
                  id: generateUniqueId(),
                  event_name: selectedItem.name,
                  event_poster:
                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
                  overview: selectedItem.pleaseNote || "",
                },
              ],
            };

            axios.patch(`${API_URL}/user/${userId}`, updated);
            // alert("Event Added Sucessfully!");
            showSuccessMessage("add", userId);
            navigate(`/dashboard/${userId}`);
          } catch {
            (error) => console.log(error);
          }
        } else {
          alert("Please select an item first");
        }
        break;

      case "book":
        if (selectedItem) {
          console.log(selectedItem);
          try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const prevBooks = response.data.books || [];

            const updated = {
              id: `${userId}`,
              books: [
                ...prevBooks,
                {
                  // id: prevBooks.length + 1,
                  id: generateUniqueId(),
                  book_title: selectedItem.volumeInfo.title,
                  author: selectedItem.volumeInfo.authors[0],
                  book_cover: selectedItem.volumeInfo.imageLinks.thumbnail,
                  published_date: selectedItem.volumeInfo.publishedDate,
                },
              ],
            };

            axios.patch(`${API_URL}/user/${userId}`, updated);
            // alert("Book Added Sucessfully!");
            showSuccessMessage("add", userId);
            navigate(`/dashboard/${userId}`);
          } catch {
            (error) => console.log(error);
          }
        } else {
          alert("Please select an item first");
        }
    }
  }

  return (
    <div className="addinterestpage">
      <div className="form-container">
        <h1>Add a new interest</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Select Type</label>
            <select
              value={formData.mediaType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mediaType: e.target.value,
                  searchParams: {},
                }))
              }
            >
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="book">Book</option>
              <option value="event">Event</option>
            </select>
          </div>

          {/* Media-specific fields */}
          {formData.mediaType === "movie" && (
            <>
              <div className="form-group">
                <label>Movie Title</label>
                <input
                  type="text"
                  name="query"
                  placeholder="Enter movie title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="Enter release year"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Language</label>
                <select name="language" onChange={handleChange} defaultValue="en-US">
                  <option value="en-US">English</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                </select>
              </div>
            </>
          )}

          {formData.mediaType === "music" && (
            <>
              <div className="form-group">
                <label>Track Name</label>
                <input
                  type="text"
                  name="track"
                  placeholder="Enter song title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Artist</label>
                <input
                  type="text"
                  name="artist"
                  placeholder="Enter artist name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Album</label>
                <input
                  type="text"
                  name="album"
                  placeholder="Enter album name"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {formData.mediaType === "book" && (
            <>
              <div className="form-group">
                <label>Book Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {formData.mediaType === "event" && (
            <>
              <div className="form-group">
                <label>Event Keyword</label>
                <input
                  type="text"
                  name="keyword"
                  placeholder="Enter event name or keyword"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" onChange={handleChange} defaultValue="">
                  <option value="">All Categories</option>
                  <option value="music">Music</option>
                  <option value="sports">Sports</option>
                  <option value="arts">Arts & Theatre</option>
                  <option value="family">Family</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <button type="submit">Search</button>
          </div>
        </form>

        {/* Results Section */}
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        {searchResults?.length > 0 && (
          <div className="results-section">
            <h2>Select an Option:</h2>
            <div className="results-scroll-container">
              <form>
                {searchResults.map((item) => (
                  <div key={item.id} className="result-item">
                    <label>
                      <input
                        type="radio"
                        name="mediaSelection"
                        value={item.id}
                        checked={selectedItem?.id === item.id}
                        onChange={() => setSelectedItem(item)}
                      />
                      {/* Movies */}
                      {item.title && (
                        <span>
                          {item.title} ({item.release_date?.split("-")[0]})
                        </span>
                      )}
                      {/* Music */}
                      {item.name && (
                        <span>
                          {item.name} - {item.artists?.[0]?.name}
                        </span>
                      )}
                      {/* Books */}
                      {item.volumeInfo && (
                        <span>
                          {item.volumeInfo.title} - {item.volumeInfo.authors?.[0]}
                        </span>
                      )}
                      {/* Events */}
                      {item.dates && (
                        <span>
                          {item.name} - {item.dates.start.localDate}
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <button className="btn-light" onClick={handleSave} disabled={!selectedItem}>
              Save Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInterestPage;
