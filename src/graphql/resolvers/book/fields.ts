import { BookResolvers } from '../../generated-types';
import { getUserById } from '../data';

const bookFields: BookResolvers = {
  user: async ({ id }) => {
    return getUserById(id);
  },
};

export default bookFields;
