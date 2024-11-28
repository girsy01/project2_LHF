import { searchMovies } from './endpoints/movieAPI';
import { searchMusic } from './endpoints/musicAPI';
import { searchBooks } from './endpoints/bookAPI';
import { searchEvents } from './endpoints/eventAPI';

export const searchMedia = async (mediaType, searchParams) => {
  try {
    switch (mediaType) {
      case 'movie':
        return await searchMovies(searchParams);
      case 'music':
        return await searchMusic(searchParams);
      case 'book':
        return await searchBooks(searchParams);
      case 'event':
        return await searchEvents(searchParams);
      default:
        throw new Error('Invalid media type');
    }
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};