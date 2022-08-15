import { userQueries, userMutations, userFields } from './user';
import { bookQueries, bookMutations, bookFields } from './book';

const resolvers = {
  /** All query resolvers go in here */
  Query: {
    ...userQueries,
    ...bookQueries,
  },
  /** All mutation resolvers go here */
  Mutation: {
    ...userMutations,
    ...bookMutations,
  },
  /** All fields resolvers go in here */
  ...userFields,
  ...bookFields,
};

export default resolvers;
