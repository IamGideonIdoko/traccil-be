import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { stringifyArr } from '../../../helpers/general.helper';
import { loginInputSchema } from '../../../joi/auth.joi';
import { QueryResolvers, ReturnedRegisteredClient } from '../../generated-types';
import { validatePassword } from '../../../helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../../../helpers/jwt.helper';

const clientQueries: QueryResolvers = {
  loginClient: async (_, { loginInput }, { prisma }) => {
    const validated = loginInputSchema.validate(loginInput);
    if (validated?.error?.details) {
      // input is not valid
      throw new ValidationError(stringifyArr(validated?.error?.details?.map((err) => err?.message)) || '');
    }
    // get client from the db
    const foundClient = await prisma.client.findFirst({ where: { email: loginInput.email } });
    if (!foundClient) throw new AuthenticationError('Client does not exists');
    const isPasswordValid = await validatePassword(loginInput.password, foundClient.password);
    // password is not correct
    if (!isPasswordValid) throw new AuthenticationError('Incorrect password');
    // hashed password should not be sent to client
    Reflect.deleteProperty(foundClient, 'password');
    // sign a new access and refresh token for saved client
    const accessToken = await signAccessToken({ clientId: foundClient.id });
    const refreshToken = await signRefreshToken({ clientId: foundClient.id });
    return {
      accessToken,
      refreshToken,
      client: foundClient,
    } as ReturnedRegisteredClient;
  },
};

export default clientQueries;
