import { eventsAxios } from './axiosConfig';

export const searchEvents = async (searchParams) => {
    try {
        const response = await eventsAxios.get('/events', {
            params: {
                keyword: searchParams.keyword,
                city: searchParams.city
            }
        });
        return response.data._embedded?.events || [];
    } catch (error) {
        throw new Error('Unable to find the requested event: ' + error.message);
    }
};