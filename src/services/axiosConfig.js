import axios from 'axios';

// TMDB (Movies)
export const tmdbAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_KEY}`
    }
});

// Spotify (Music)
export const spotifyAxios = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// For spotify auth
let spotifyToken = null;
const getSpotifyToken = async () => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(
                        import.meta.env.VITE_SPOTIFY_CLIENT_ID + ':' + 
                        import.meta.env.VITE_SPOTIFY_SECRET_KEY
                    )
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Spotify auth error:', error);
        throw error;
    }
};

// Add Spotify token to requests
spotifyAxios.interceptors.request.use(
    async (config) => {
        if (!spotifyToken) {
            spotifyToken = await getSpotifyToken();
        }
        config.headers.Authorization = `Bearer ${spotifyToken}`;
        return config;
    }
);

// Open Library Books
export const booksAxios = axios.create({
    baseURL: 'https://openlibrary.org'
});

// Ticketmaster (Events)
export const eventsAxios = axios.create({
    baseURL: 'https://app.ticketmaster.com/discovery/v2',
    params: {
        apikey: import.meta.env.VITE_TICKETMASTER_KEY
    }
});