import { resolvers as scalarResolvers } from 'graphql-scalars';
import { userQueries, userMutations, userFields } from './user';
import { bookQueries, bookMutations, bookFields } from './book';
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  /** All scalar resolvers  */
  ...scalarResolvers,
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
  /** All field resolvers go in here */
  User: {
    ...userFields,
  },
  Book: {
    ...bookFields,
  },
};

export default resolvers;
