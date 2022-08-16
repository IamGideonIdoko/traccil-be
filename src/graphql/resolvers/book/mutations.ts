import { uuid } from 'uuidv4';
import { MutationResolvers } from '../../generated-types';
import { books } from '../data';

const bookMutations: MutationResolvers = {
  addBook: async (_, { name, genre, userId }) => {
    const newBook = {
      id: uuid(),
      name: name || 'undefined',
      genre: genre || 'undefined',
      userId: userId || 'undefined',
    };
    books.push(newBook);
    return newBook;
  },
};

export default bookMutations;
