import { useState, useEffect } from "react";
import { searchMovies } from "../services/endpoints/movieAPI";
import { searchMusic } from "../services/endpoints/musicAPI";
import { searchBooks } from "../services/endpoints/bookAPI";
import { searchEvents } from "../services/endpoints/eventAPI";

const AddInterestPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    mediaType: "movie",
    searchParams: {},
  });

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
          console.log("Movie results:", results);
          break;

        case "music":
          results = await searchMusic(formData.searchParams);
          console.log("Music results:", results);
          break;

        case "book":
          results = await searchBooks(formData.searchParams);
          console.log("Book results:", results);
          break;

        case "event":
          results = await searchEvents(formData.searchParams);
          console.log("Event results:", results);
          break;
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
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
        {/* Movie Fields */}
        {formData.mediaType === "movie" && (
          <>
            <div className="form-group">
              <label>Movie Title</label>
              <input
                type="text"
                name="query" // Changed from "title" as TMDB API uses query
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

        {/* Music Fields */}
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

        {/* Book Fields */}
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

        {/* Event Fields */}
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
    </div>
  );
};

export default AddInterestPage;
