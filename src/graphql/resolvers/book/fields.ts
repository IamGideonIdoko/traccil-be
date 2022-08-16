import { BookResolvers } from '../../generated-types';
import { getUserById } from '../data';

const bookFields: BookResolvers = {
  user: async ({ userId }) => {
    return getUserById(userId);
  },
};

export default bookFields;
