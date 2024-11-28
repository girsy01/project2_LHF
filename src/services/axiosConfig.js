import axios from 'axios';

// TMDB (Movies)
export const tmdbAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_READ_KEY}`
    }
});

// Spotify (Music)
export const spotifyAxios = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add Spotify auth - since it needs both client ID and secret
let spotifyToken = null;
const getSpotifyToken = async () => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(
                        process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + 
                        process.env.REACT_APP_SPOTIFY_SECRET_KEY
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

// Google Books
export const booksAxios = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    params: {
        key: process.env.REACT_APP_BOOKS_KEY
    }
});

// Ticketmaster (Events)
export const eventsAxios = axios.create({
    baseURL: 'https://app.ticketmaster.com/discovery/v2',
    params: {
        apikey: process.env.REACT_APP_TICKETMASTER_KEY
    }
});