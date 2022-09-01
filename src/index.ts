import { createServer } from 'http';
import express, { Application, Request, Response } from 'express';
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

config();

(async () => {
  const app: Application = express();

  // development logging
  if (envConfig.isDevelopment) app.use(morgan('dev'));

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
      service: 'OgaRepair Core Backend',
    });
  });

  const httpServer = createServer(app);
  const apolloServer = getApolloServer(httpServer);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api/graphql' });
  await new Promise<void>((resolve) => httpServer.listen({ port: envConfig.port }, resolve));
  console.log(`🚀 HTTP Server ready at http://localhost:${envConfig.port}`);
  console.log(`💹🚀 GraphQL Server ready at http://localhost:${envConfig.port}${apolloServer.graphqlPath}`);
})();
