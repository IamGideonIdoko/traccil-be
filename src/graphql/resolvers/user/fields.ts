import { UserResolvers } from '../../generated-types';
import { getBooksByUserId } from '../data';

const userFields: UserResolvers = {
  books: async ({ id }) => {
    return getBooksByUserId(id);
  },
};

export default userFields;
