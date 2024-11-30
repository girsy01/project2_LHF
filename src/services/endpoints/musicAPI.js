import { spotifyAxios } from './axiosConfig';

export const searchMusic = async (searchParams) => {
    try {
        const response = await spotifyAxios.get('/search', {
            params: {
                query: `${searchParams.track} ${searchParams.artist}`,
                type: 'track',
                limit: 20
            }
        });
        return response.data.tracks.items;
    } catch (error) {
        throw new Error('Unable to find the requested song: ' + error.message);
    }
};