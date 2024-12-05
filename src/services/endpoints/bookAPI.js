import { booksAxios } from '../axiosConfig';

export const searchBooks = async (searchParams) => {
    try {
        const response = await booksAxios.get('/search.json', {
            params: {
                q: `${searchParams.title} ${searchParams.author}`.trim(),
                limit: 20
            }
        });
        
        // Transform the response
        return response.data.docs.map(book => ({
            id: book.key,
            volumeInfo: {
                title: book.title,
                authors: book.author_name,
                publishedDate: book.first_publish_year,
                imageLinks: {
                    thumbnail: book.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
                }
            }
        }));
    } catch (error) {
        throw new Error('Unable to find the requested book: ' + error.message);
    }
};