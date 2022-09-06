import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { v4 as uuid } from 'uuid';
import { MutationResolvers, ReturnedRegisteredWorker } from '../../generated-types';
import { registerWorkerInputSchema } from '../../../joi/worker.joi';
import { stringifyArr } from '../../../helpers/general.helper';
import { hashPassword } from '../../../helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../../../helpers/jwt.helper';

const workerMutations: MutationResolvers = {
  registerWorker: async (_, { worker }, { prisma }) => {
    const validated = registerWorkerInputSchema.validate(worker);
    // input is not valid if there are error details
    if (validated?.error?.details) {
      throw new ValidationError(stringifyArr(validated?.error?.details?.map((err) => err?.message)) || '');
    }
    // check if user with email already exists
    const foundWorker = await prisma.worker.findFirst({ where: { email: worker.email } });
    if (foundWorker) throw new AuthenticationError('Worker already exists');
    const newWorker = {
      id: uuid(),
      ...worker,
    };
    // remove repeat_password from newWorker
    Reflect.deleteProperty(newWorker, 'repeat_password');
    // hash worker password
    const hashedPassword = await hashPassword(newWorker.password);
    // replace new worker password with hashed password
    newWorker.password = hashedPassword;
    // save worker to database
    const savedWorker = await prisma.worker.create({
      data: newWorker,
    });
    // hashed password should not be sent to client
    Reflect.deleteProperty(savedWorker, 'password');
    // sign a new access and refresh token for saved worker
    const accessToken = await signAccessToken({ workerId: savedWorker.id });
    const refreshToken = await signRefreshToken({ workerId: savedWorker.id });
    return {
      accessToken,
      refreshToken,
      worker: savedWorker,
    } as ReturnedRegisteredWorker;
  },
};

export default workerMutations;
