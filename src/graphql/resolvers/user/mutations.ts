import { v4 as uuid } from 'uuid';
import { MutationResolvers } from '../../generated-types';
import { users } from '../data';

const userMutations: MutationResolvers = {
  addUser: async (_, { name, age }, { loaders }) => {
    const newUser = { id: uuid(), name: name || 'undefined', age: age || 0 };
    users.push(newUser);
    return loaders.user.one(newUser.id);
  },
};

export default userMutations;
