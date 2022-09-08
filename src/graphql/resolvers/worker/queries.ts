import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { stringifyArr } from '../../../helpers/general.helper';
import { loginInputSchema } from '../../../joi/auth.joi';
import { QueryResolvers, ReturnedRegisteredWorker } from '../../generated-types';
import { validatePassword } from '../../../helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../../../helpers/jwt.helper';

const workerQueries: QueryResolvers = {
  loginWorker: async (_, { loginInput }, { prisma }) => {
    const validated = loginInputSchema.validate(loginInput);
    if (validated?.error?.details) {
      // input is not valid
      throw new ValidationError(stringifyArr(validated?.error?.details?.map((err) => err?.message)) || '');
    }
    // get worker from the db
    const foundWorker = await prisma.worker.findFirst({ where: { email: loginInput.email } });
    if (!foundWorker) throw new AuthenticationError('Worker does not exists');
    const isPasswordValid = await validatePassword(loginInput.password, foundWorker.password);
    // password is not correct
    if (!isPasswordValid) throw new AuthenticationError('Incorrect password');
    // hashed password should not be sent to client
    Reflect.deleteProperty(foundWorker, 'password');
    // sign a new access and refresh token for saved worker
    const accessToken = await signAccessToken({ workerId: foundWorker.id });
    const refreshToken = await signRefreshToken({ workerId: foundWorker.id });
    return {
      accessToken,
      refreshToken,
      worker: foundWorker,
    } as ReturnedRegisteredWorker;
  },
};

export default workerQueries;
