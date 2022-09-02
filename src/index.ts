import { createServer } from 'http';
import express from 'express';
import type { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import { envConfig } from './config/environment.config';
import xss from 'xss-clean';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import limiter from './config/limiter.config';
import appCors from './config/cors.config';
import getApolloServer from './graphql/index';
import { prisma } from './graphql/context';
import errorHandler from './middlewares/error.middleware';

config();

(async () => {
  const app: Application = express();

  // development logging
  if (envConfig.isProduction) {
    app.use(morgan('common'));
  } else {
    app.use(morgan('dev'));
  }

  // limit size of request payload
  app.use(express.json({ limit: '1MB' }));

  // parse urlencoded payloads with qs library
  app.use(express.urlencoded({ extended: true }));

  // sanitize data against xss
  app.use(xss());

  // compress payload
  app.use(compression());

  // parse cookies
  app.use(cookieParser());

  // add secure http headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: !envConfig.isDevelopment,
      contentSecurityPolicy: !envConfig.isDevelopment,
    }),
  );

  // register rate limiter
  app.use(limiter());

  // cors
  app.use(appCors());

  // test prisma connection
  try {
    await prisma.$connect();
    console.log('\x1b[32m%s\x1b[0m', '😎 Prisma connected to database');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '😔 Prisma failed to connect database');
  }

  // Routes
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Service is up and running!',
    });
  });

  const httpServer = createServer(app);
  const apolloServer = getApolloServer(httpServer);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api/graphql' });

  // Error for unhandled routes
  app.use((_, res: Response) => {
    res.status(404).json({
      status: 'fail',
      message: 'Route not found!',
    });
  });

  app.use(errorHandler);

  // throw unhandled rejection to a fallback handler
  process.on('unhandledRejection', (reason: Error) => {
    console.log('\x1b[31m%s\x1b[0m', `Unhandled Rejection: ${reason}`);
    throw reason;
  });

  // kill app if there's an uncaught exception
  process.on('uncaughtException', (error: Error) => {
    console.log('\x1b[31m%s\x1b[0m', `UncaughtException Error: ${error}`);
    process.exit(1);
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: envConfig.port }, resolve));
  console.log(`🚀 HTTP Server ready at http://localhost:${envConfig.port}`);
  console.log(`💹🚀 GraphQL Server ready at http://localhost:${envConfig.port}${apolloServer.graphqlPath}`);
})();
