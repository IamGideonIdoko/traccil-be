import { getUsers } from '../data';
import { QueryResolvers } from '../../generated-types';

const userQueries: QueryResolvers = {
  user: async (_, { id }, { loaders }) => loaders.user.one(id),
  // users: async (_, __, { loaders }) => loaders.user.many(getUsers().map(({ id }) => id)),
  users: async () => getUsers(),
};

export default userQueries;
