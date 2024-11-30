import { useMedia } from '../contexts/MediaContext';
import { useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
    const { searchResults, loading, error } = useMedia();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!searchResults?.length) return <div>No results found</div>;

    return (
        <div>
            <h2>Search Results</h2>
            <button onClick={() => navigate(-1)}>Back to Search</button>

            <div>
                {searchResults.map((item) => (
                    <div key={item.id}>
                        {/* Movies */}
                        {item.title && (
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.release_date}</p>
                            </div>
                        )}

                        {/* Music */}
                        {item.name && (
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.artists?.[0]?.name}</p>
                            </div>
                        )}

                        {/* Books */}
                        {item.volumeInfo && (
                            <div>
                                <h3>{item.volumeInfo.title}</h3>
                                <p>{item.volumeInfo.authors?.[0]}</p>
                            </div>
                        )}

                        {/* Events */}
                        {item.dates && (
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.dates.start.localDate}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResultsPage;