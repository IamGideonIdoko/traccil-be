import { getBooks } from '../data';
import { QueryResolvers } from '../../generated-types';

const bookQueries: QueryResolvers = {
  book: async (_, { id }, { loaders }) => {
    return loaders.book.one(id);
  },
  books: async (_, __, { loaders }) => loaders.book.many(getBooks().map(({ id }) => id)),
};

export default bookQueries;
