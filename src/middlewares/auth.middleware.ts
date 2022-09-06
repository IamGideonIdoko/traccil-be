import jwt from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';
import constants from '../config/constants.config';
import { AuthReq } from '../interfaces/middleware.interface';
import { JwtCustomPayload } from '../interfaces/helper.interface';

const auth = (req: AuthReq, _: Response, next: NextFunction): void => {
  // get the token from the request header

  const bearerToken = req.header('Authorization');

  // check if token is available
  if (!bearerToken) return next();
  const bearer = bearerToken.split(' ')[0];
  const token = bearerToken.split(' ')[1];

  if (bearer.trim() !== 'Bearer' || !token) return next();

  try {
    // verify token token if available
    const decoded = jwt.verify(token, constants.accessTokenSecret) as JwtCustomPayload;
    if (decoded?.workerId) req.workerId = decoded.workerId;
    if (decoded?.clientId) req.clientId = decoded.clientId;
    if (decoded?.adminId) req.adminId = decoded.adminId;
    next();
  } catch (e) {
    return next();
  }
};

export default auth;
