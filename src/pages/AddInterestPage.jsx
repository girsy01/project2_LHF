import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/endpoints/movieAPI";
import { searchMusic } from "../services/endpoints/musicAPI";
import { searchBooks } from "../services/endpoints/bookAPI";
import { searchEvents } from "../services/endpoints/eventAPI";
import { useMedia } from "../contexts/MediaContext";

const AddInterestPage = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleSaveSelection = () => {
    if (!selectedItem) {
      alert('Please select an item first');
      return;
    }
  
    let formattedItem;
    switch(formData.mediaType) {
      case 'movie':
        formattedItem = {
          id: selectedItem.id,
          type: 'movie',
          title: selectedItem.title,
          year: selectedItem.release_date?.split('-')[0],
          poster: selectedItem.poster_path ? 
            `https://image.tmdb.org/t/p/w500${selectedItem.poster_path}` : null,
          overview: selectedItem.overview
        };
        break;
  
      case 'music':
        formattedItem = {
          id: selectedItem.id,
          type: 'music',
          title: selectedItem.name,
          artist: selectedItem.artists?.[0]?.name,
          album: selectedItem.album?.name,
          image: selectedItem.album?.images?.[0]?.url
        };
        break;
  
      case 'book':
        formattedItem = {
          id: selectedItem.id,
          type: 'book',
          title: selectedItem.volumeInfo.title,
          author: selectedItem.volumeInfo.authors?.[0],
          image: selectedItem.volumeInfo.imageLinks?.thumbnail,
          publishedDate: selectedItem.volumeInfo.publishedDate
        };
        break;
  
      case 'event':
        formattedItem = {
          id: selectedItem.id,
          type: 'event',
          title: selectedItem.name,
          date: selectedItem.dates.start.localDate,
          venue: selectedItem._embedded?.venues?.[0]?.name,
          image: selectedItem.images?.[0]?.url
        };
        break;
    }
  
    console.log('Formatted item:', formattedItem);
    navigate('/dashboard', { state: { savedItem: formattedItem }});
  };

  return (
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
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                placeholder="Enter ISBN (optional)"
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
            <button
              onClick={handleSaveSelection}
              disabled={!selectedItem}
              className="save-button"
            >
              Save Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default AddInterestPage;
