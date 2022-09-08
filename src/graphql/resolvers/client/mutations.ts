import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { v4 as uuid } from 'uuid';
import { MutationResolvers, ReturnedRegisteredClient } from '../../generated-types';
import { registerClientInputSchema } from '../../../joi/client.joi';
import { stringifyArr } from '../../../helpers/general.helper';
import { hashPassword } from '../../../helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../../../helpers/jwt.helper';

const clientMutations: MutationResolvers = {
  registerClient: async (_, { client }, { prisma }) => {
    const validated = registerClientInputSchema.validate(client);
    // input is not valid if there are error details
    if (validated?.error?.details) {
      throw new ValidationError(stringifyArr(validated?.error?.details?.map((err) => err?.message)) || '');
    }
    // check if user with email already exists
    const foundClient = await prisma.client.findFirst({ where: { email: client.email } });
    if (foundClient) throw new AuthenticationError('Client already exists');
    const newClient = {
      id: uuid(),
      ...client,
    };
    // remove repeat_password from newClient
    Reflect.deleteProperty(newClient, 'repeat_password');
    // hash client password
    const hashedPassword = await hashPassword(newClient.password);
    // replace new client password with hashed password
    newClient.password = hashedPassword;
    // save client to database
    const savedClient = await prisma.client.create({
      data: newClient,
    });
    // hashed password should not be sent to client
    Reflect.deleteProperty(savedClient, 'password');
    // sign a new access and refresh token for saved client
    const accessToken = await signAccessToken({ clientId: savedClient.id });
    const refreshToken = await signRefreshToken({ clientId: savedClient.id });
    return {
      accessToken,
      refreshToken,
      client: savedClient,
    } as ReturnedRegisteredClient;
  },
};

export default clientMutations;
