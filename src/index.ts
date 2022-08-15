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
  app.use(helmet());

  // register rate limiter
  app.use(limiter());

  // cors
  app.use(appCors());

  // Routes
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      name: 'OgaRepair Core Backend',
      description: 'Core service for OgaRepair',
    });
  });

  const httpServer = createServer(app);
  await new Promise<void>((resolve) => httpServer.listen({ port: envConfig.port }, resolve));
  console.log(`🚀 HTTP Server ready at http://localhost:${envConfig.port}`);
})();
