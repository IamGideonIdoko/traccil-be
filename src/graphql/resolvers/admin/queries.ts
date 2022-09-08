import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { stringifyArr } from '../../../helpers/general.helper';
import { loginInputSchema } from '../../../joi/auth.joi';
import { QueryResolvers, ReturnedRegisteredAdmin } from '../../generated-types';
import { validatePassword } from '../../../helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../../../helpers/jwt.helper';

const adminQueries: QueryResolvers = {
  loginAdmin: async (_, { loginInput }, { prisma }) => {
    const validated = loginInputSchema.validate(loginInput);
    if (validated?.error?.details) {
      // input is not valid
      throw new ValidationError(stringifyArr(validated?.error?.details?.map((err) => err?.message)) || '');
    }
    // get admin from the db
    const foundAdmin = await prisma.admin.findFirst({ where: { email: loginInput.email } });
    if (!foundAdmin) throw new AuthenticationError('Admin does not exists');
    const isPasswordValid = await validatePassword(loginInput.password, foundAdmin.password);
    // password is not correct
    if (!isPasswordValid) throw new AuthenticationError('Incorrect password');
    // hashed password should not be sent to client
    Reflect.deleteProperty(foundAdmin, 'password');
    // sign a new access and refresh token for saved admin
    const accessToken = await signAccessToken({ adminId: foundAdmin.id });
    const refreshToken = await signRefreshToken({ adminId: foundAdmin.id });
    return {
      accessToken,
      refreshToken,
      admin: foundAdmin,
    } as ReturnedRegisteredAdmin;
  },
};

export default adminQueries;
