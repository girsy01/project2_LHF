import { useState, useEffect } from "react";

const AddInterestPage = () => {
  const [formData, setFormData] = useState({
    mediaType: "movie",
    searchParams: {},
  });

  const handleChange = (event) => {
    const [name, value] = event.target;

    setFormData((prev) => ({
      ...prev,
      searchParams: {
        ...prev.searchParams,
        [name]: value,
      },
    }));
  };

<<<<<<< HEAD
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <h2>Add a new interest</h2>

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
=======
        setFormData(prev => ({
            ...prev,
            searchParams: {
                ...prev.searchParams,
                [name]: type === 'checkbox' ? checked : value
>>>>>>> Luke
            }
          >
            <option value="movie">Movie</option>
            <option value="music">Music</option>
            <option value="book">Book</option>
            <option value="event">Event</option>
          </select>
        </div>
<<<<<<< HEAD
        {/* Movie Fields */}
        {formData.mediaType === "movie" && (
          <>
            <div className="form-group">
              <label>Movie Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter movie title"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" name="year" placeholder="Enter year" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input
                type="text"
                name="director"
                placeholder="Enter director's name"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Music Fields */}
        {formData.mediaType === "music" && (
          <>
            <div className="form-group">
              <label>Song Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter song title"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>PLACEHOLDER</label>
              <input
                type="number"
                name="PLACEHOLDER"
                placeholder="Enter PLACEHOLDER"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>PLACEHOLDER</label>
              <input
                type="text"
                name="PLACEHOLDER"
                placeholder="Enter PLACEHOLDER"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Book Fields */}
        {formData.mediaType === "Book" && (
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
              <label>PLACEHOLDER</label>
              <input
                type="number"
                name="PLACEHOLDER"
                placeholder="Enter PLACEHOLDER"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>PLACEHOLDER</label>
              <input
                type="text"
                name="PLACEHOLDER"
                placeholder="Enter PLACEHOLDER"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Event Fields */}
        {formData.mediaType === "event" && (
          <>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Event title"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>PLACEHOLDER</label>
              <input
                type="number"
                name="PLACEHOLDER"
                placeholder="Enter PLACEHOLDER"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>PLACEHOLDER</label>
              <input
                type="text"
                name="PLACEHOLDER"
                placeholder="Enter PLACEHOLDER"
                onChange={handleChange}
              />
            </div>
          </>
        )}
=======
                {/* Movie Fields (TMDB API) */}
                {formData.mediaType === 'movie' && (
                <>
                    <div className="form-group">
                    <label>Movie Title</label>
                    <input
                        type="text"
                        name="query"
                        value={formData.searchParams.query || ''}
                        onChange={handleChange}
                        placeholder="Enter movie title"
                        required
                    />
                    <small className="input-help">Required for movie search</small>
                    </div>

                    <div className="form-group">
                    <label>Release Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.searchParams.year || ''}
                        onChange={handleChange}
                        placeholder="Enter release year"
                        min="1900"
                        max="2030"
                    />
                    </div>

                    <div className="form-group">
                    <label>Language</label>
                    <select
                        name="language"
                        value={formData.searchParams.language || 'en-US'}
                        onChange={handleChange}
                    >
                        <option value="en-US">English</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                    </select>
                    </div>

                    <div className="form-group checkbox-group">
                    <label>
                        <input
                        type="checkbox"
                        name="include_adult"
                        checked={formData.searchParams.include_adult || false}
                        onChange={handleChange}
                        />
                        Include Adult Content
                    </label>
                    </div>
                </>
                )}

                {/* Music Fields (Spotify/Last.fm) */}
                {formData.mediaType === 'music' && (
                <>
                    <div className="form-group">
                    <label>Track Name</label>
                    <input
                        type="text"
                        name="track"
                        value={formData.searchParams.track || ''}
                        onChange={handleChange}
                        placeholder="Enter song name"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Artist</label>
                    <input
                        type="text"
                        name="artist"
                        value={formData.searchParams.artist || ''}
                        onChange={handleChange}
                        placeholder="Enter artist name"
                    />
                    </div>

                    <div className="form-group">
                    <label>Album</label>
                    <input
                        type="text"
                        name="album"
                        value={formData.searchParams.album || ''}
                        onChange={handleChange}
                        placeholder="Enter album name"
                    />
                    </div>
                </>
                )}

                {/* Book Fields (Google Books API) */}
                {formData.mediaType === 'book' && (
                <>
                    <div className="form-group">
                    <label>Book Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.searchParams.title || ''}
                        onChange={handleChange}
                        placeholder="Enter book title"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.searchParams.author || ''}
                        onChange={handleChange}
                        placeholder="Enter author name"
                    />
                    </div>

                    <div className="form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.searchParams.isbn || ''}
                        onChange={handleChange}
                        placeholder="Enter ISBN"
                    />
                    </div>
                </>
                )}

                {/* Event Fields (Ticketmaster API) */}
                {formData.mediaType === 'event' && (
                <>
                    <div className="form-group">
                    <label>Event Name</label>
                    <input
                        type="text"
                        name="keyword"
                        value={formData.searchParams.keyword || ''}
                        onChange={handleChange}
                        placeholder="Enter event name"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.searchParams.city || ''}
                        onChange={handleChange}
                        placeholder="Enter city"
                    />
                    </div>

                    <div className="form-group">
                    <label>Date Range</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.searchParams.startDate || ''}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.searchParams.category || ''}
                        onChange={handleChange}
                    >
                        <option value="">All Categories</option>
                        <option value="music">Music</option>
                        <option value="sports">Sports</option>
                        <option value="arts">Arts & Theatre</option>
                        <option value="family">Family</option>
                    </select>
                    </div>
                </>
                )}
>>>>>>> Luke

        <div className="form-group">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default AddInterestPage;
