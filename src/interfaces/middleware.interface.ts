import type { Request } from 'express';
import { JwtCustomPayload } from './helper.interface';

export interface AuthReq extends JwtCustomPayload, Request {
  workerId?: string;
  clientId?: string;
  adminId?: string;
}
