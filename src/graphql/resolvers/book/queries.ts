import { getBookById, getBooks } from '../data';
import { QueryResolvers } from '../../generated-types';

const bookQueries: QueryResolvers = {
  book: async (_, { id }) => {
    return getBookById(id);
  },
  books: async () => getBooks(),
};

export default bookQueries;
