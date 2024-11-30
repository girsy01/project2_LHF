import { createContext, useState, useContext } from 'react';

const MediaContext = createContext();

export const MediaProvider = ({children}) => {

    const [searchResults, setSearchResults] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <MediaContext.Provider value={{
            searchResults,
            setSearchResults,
            selectedMedia,
            setSelectedMedia,
            loading,
            setLoading,
            error,
            setError
        }}>
            {children}
        </MediaContext.Provider>
    );
}

export const useMedia = () => useContext(MediaContext);