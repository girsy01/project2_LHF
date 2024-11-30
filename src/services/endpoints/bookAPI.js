import { booksAxios } from '../axiosConfig';

export const searchBooks = async (searchParams) => {
    try {
        const response = await booksAxios.get('/volumes', {
            params: {
                query: `${searchParams.title} ${searchParams.author}`
            }
        });
        return response.data.items;
    } catch (error) {
        throw new Error('Unable to find the requested book: ' + error.message);
    }
};