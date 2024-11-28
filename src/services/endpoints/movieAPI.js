import { tmdbAxios } from './axiosConfig';

export const searchMovies = async (searchParams) => {
    const response = await tmdbAxios.get('/search/movie', {
        params: {
            query: searchParams.query,
            include_adult: searchParams.include_adult,
            language: searchParams.language || 'en-US',
            year: searchParams.year
        }
    });
    return response.data.results;
};