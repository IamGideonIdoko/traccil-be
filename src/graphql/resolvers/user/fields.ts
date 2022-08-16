import { UserResolvers } from '../../generated-types';

const userFields: UserResolvers = {
  books: async ({ id }, _, { loaders }) => {
    return loaders.book.one_by_author(id);
  },
};

export default userFields;
