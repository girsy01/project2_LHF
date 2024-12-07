import { booksAxios } from '../axiosConfig';

export const searchBooks = async (searchParams) => {
    try {
        let query = '';
        if (searchParams.title) query += `title:${searchParams.title}`;
        if (searchParams.author) query += ` author:${searchParams.author}`;

        const response = await booksAxios.get('/search.json', {
            params: {
                q: query.trim(),
                fields: 'key,title,author_name,first_publish_year,cover_i,isbn',
                limit: 10
            }
        });
        
        return response.data.docs.map(book => ({
            id: book.key.replace('/works/', ''),
            volumeInfo: {
                title: book.title,
                authors: book.author_name,
                publishedDate: book.first_publish_year,
                isbn: book.isbn?.[0],
                imageLinks: {
                    thumbnail: book.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 
                        null
                }
            }
        }));

    } catch (error) {
        throw new Error('Unable to find the requested book: ' + error.message);
    }
};