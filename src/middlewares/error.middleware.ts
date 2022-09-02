import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { envConfig } from '../config/environment.config';

const handleDevError: ErrorRequestHandler = (err, _, res: Response) => {
  if (err.isOperational) {
    console.log('\x1b[31m%s\x1b[0m', `[Error Handler] - Operational Error: ${err.message}`);
  } else {
    console.log('\x1b[31m%s\x1b[0m', `[Error Handler] - Programming/Unknown Error: ${err.message}`);
  }

  return res.status(err.statusCode).json({
    ...err,
    message: err.message,
  });
};

const handleProdError: ErrorRequestHandler = (err, _, res: Response) => {
  // Operational errors are a bit trusted so send to client
  if (err.isOperational) {
    console.log('\x1b[31m%s\x1b[0m', `[Error Handler] - Operational Error: ${err.message}`);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown errors should not be leaked so send generic message
  console.log(
    '\x1b[31m%s\x1b[0m',
    `[Error Handler] - Programming/Unknown Error:
  ${err.message}`,
  );
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

const errorHandler: ErrorRequestHandler = (err, _: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  if (envConfig.isProduction) {
    const error = {
      ...err,
    };

    error.message = err.message;

    handleProdError(error, _, res, next);
  } else {
    handleDevError(err, _, res, next);
  }
};

export default errorHandler;
