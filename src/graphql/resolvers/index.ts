import { resolvers as scalarResolvers } from 'graphql-scalars';
import { userQueries, userMutations, userFields } from './user';
import { bookQueries, bookMutations, bookFields } from './book';
import { workerQueries, workerMutations, workerFields } from './worker';
import { clientQueries, clientMutations, clientFields } from './client';
import { adminQueries, adminMutations, adminFields } from './admin';
import { Resolvers } from '../generated-types';

const resolvers: Resolvers = {
  /** All scalar resolvers  */
  ...scalarResolvers,
  /** All query resolvers go in here */
  Query: {
    ...userQueries,
    ...bookQueries,
    ...workerQueries,
    ...clientQueries,
    ...adminQueries,
  },
  /** All mutation resolvers go here */
  Mutation: {
    ...userMutations,
    ...bookMutations,
    ...workerMutations,
    ...clientMutations,
    ...adminMutations,
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
  Client: {
    ...clientFields,
  },
  Admin: {
    ...adminFields,
  },
};

export default resolvers;
