import { resolvers as scalarResolvers } from 'graphql-scalars';
import { userQueries, userMutations, userFields } from './user';
import { bookQueries, bookMutations, bookFields } from './book';
import { workerQueries, workerMutations, workerFields } from './worker';
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  /** All scalar resolvers  */
  ...scalarResolvers,
  /** All query resolvers go in here */
  Query: {
    ...userQueries,
    ...bookQueries,
    ...workerQueries,
  },
  /** All mutation resolvers go here */
  Mutation: {
    ...userMutations,
    ...bookMutations,
    ...workerMutations,
  },
  /** All field resolvers go in here */
  User: {
    ...userFields,
  },
  Book: {
    ...bookFields,
  },
  Worker: {
    ...workerFields,
  },
};

export default resolvers;
