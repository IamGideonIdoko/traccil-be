import { uuid } from 'uuidv4';
import { MutationResolvers } from '../../generated-types';
import { users } from '../data';

const userMutations: MutationResolvers = {
  addUser: async (_, { name, age }) => {
    const newUser = { id: uuid(), name: name || 'undefined', age: age || 0 };
    users.push(newUser);
    return newUser;
  },
};

export default userMutations;
