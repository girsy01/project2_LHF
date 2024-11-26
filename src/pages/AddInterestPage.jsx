import {useState, useEffect} from 'react';

const AddInterestPage = () => {

    const [formData, setFormData] = useState({
        mediaType: "movie",
        searchParams: {}
    })

    const handleChange = (event) => {
        const [name, value] = event.target;

        setFormData(prev => ({
            ...prev,
            searchParams: {
                ...prev.searchParams,
                [name]: value
            }
        }))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='form-container'>
            <h2>Add a new interest</h2>

            <form onSubmit={handleFormSubmit}>
                <div className='form-group'>
                    <label>Select Type</label>
                    <select
                        value={formData.mediaType}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            mediaType: e.target.value,
                            searchParams: {}
                        }))}
                    >

                        <option value="movie">Movie</option>
                        <option value="music">Music</option>
                        <option value="book">Book</option>
                        <option value="event">Event</option>
                    </select>
        </div>
                            {/* Movie Fields */}
                {formData.mediaType === 'movie' && (
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
                    <input
                        type="number"
                        name="year"
                        placeholder="Enter year"
                        onChange={handleChange}
                    />
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
                {formData.mediaType === 'music' && (
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
                {formData.mediaType === 'Book' && (
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
                {formData.mediaType === 'event' && (
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

                <div className="form-group">
                <button type="submit">Search</button>
                </div>

            </form>
        </div>
    )
}

export default AddInterestPage