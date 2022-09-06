import { ApolloError, ValidationError } from 'apollo-server-express';
import { v4 as uuid } from 'uuid';
import { MutationResolvers } from '../../generated-types';
import { registerWorkerInputSchema } from '../../../joi/worker.joi';

const workerMutations: MutationResolvers = {
  registerWorker: async (_, { worker }, { prisma }) => {
    const validated = registerWorkerInputSchema.validate(worker);
    if (validated?.error?.details) {
      throw new ValidationError(validated?.error?.details?.[0]?.message || '');
    }
    try {
      const newWorker = await prisma.worker.create({
        data: {
          id: uuid(),
          ...worker,
        },
      });
      console.log('new worker => ', newWorker);
      return null;
    } catch (err) {
      console.log('Register Worker Error: ', err);
      throw new ApolloError('Unable to register worker');
    }
  },
};

export default workerMutations;
