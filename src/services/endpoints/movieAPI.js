import { tmdbAxios } from '../axiosConfig';

export const searchMovies = async (searchParams) => {
    try {
        const response = await tmdbAxios.get('/search/movie', {
            params: {
                query: searchParams.query,
                language: 'en-US',
                page: 1
            }
        });
        return response.data.results;
    } catch (error) {
        throw new Error('Unable to find the requested movie: ' + error.message);
    }
};