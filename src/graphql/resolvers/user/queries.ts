import { getUserById, getUsers } from '../data';
import { QueryResolvers } from '../../generated-types';

const userQueries: QueryResolvers = {
  user: async (_, { id }) => getUserById(id),
  users: async () => getUsers(),
};

export default userQueries;
