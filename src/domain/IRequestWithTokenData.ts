import { Request } from 'express';

interface IRequestWithTokenData extends Request {
  userId?: number;
  email?: string;
  isAdmin?: boolean;
}
export default IRequestWithTokenData;

export interface IDataInToken {
  userId: number;
  email: string;
  isAdmin: boolean;
}
