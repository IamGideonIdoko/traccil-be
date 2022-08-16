import { v4 as uuid } from 'uuid';
import { MutationResolvers } from '../../generated-types';
import { books } from '../data';

const bookMutations: MutationResolvers = {
  addBook: async (_, { name, genre, userId }, { loaders }) => {
    const newBook = {
      id: uuid(),
      name: name || 'undefined',
      genre: genre || 'undefined',
      userId: userId || 'undefined',
    };
    books.push(newBook);
    return loaders.book.one(newBook.id);
  },
};

export default bookMutations;
