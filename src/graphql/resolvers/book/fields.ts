import { BookResolvers } from '../../generated-types';

const bookFields: BookResolvers = {
  user: async ({ userId }, _, { loaders }) => {
    return loaders.user.one(userId);
  },
};

export default bookFields;
