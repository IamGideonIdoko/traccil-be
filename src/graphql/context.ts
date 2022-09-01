import { ContextFunction } from 'apollo-server-core';
import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { getBookByIds, getBooksByUserIds, getUserByIds } from './resolvers/data';
import { IProducedContext } from '../interfaces/graphql.interface';

const prisma = new PrismaClient();

const createUserLoader = () => {
  // loader takes in a batch function
  const loader = new DataLoader(async (keys) => {
    return getUserByIds(keys as string[]);
  });
  return {
    one: async (id: string) => loader.load(id),
    many: async (ids: string[]) => loader.loadMany(ids),
  };
};

const createBookLoader = () => {
  // from any book
  const loader1 = new DataLoader(async (keys) => {
    return getBookByIds(keys as string[]);
  });
  // from book belonging to a user
  const loader2 = new DataLoader(async (keys) => getBooksByUserIds(keys as string[]));
  return {
    one: async (id: string) => loader1.load(id),
    many: async (ids: string[]) => loader1.loadMany(ids),
    one_by_author: async (id: string) => loader2.load(id),
  };
};

/**
 * This context function is run on every request
 */
const context: ContextFunction<unknown, IProducedContext> = async () => {
  return {
    loaders: {
      user: createUserLoader(),
      book: createBookLoader(),
    },
    prisma,
  };
};

export { prisma };

export default context;
