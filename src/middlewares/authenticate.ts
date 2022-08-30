import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import RequestWithTokenData, { IDataInToken } from '../domain/IRequestWithTokenData';
import CustomError from '../misc/CustomError';

const authenticate = async (req: RequestWithTokenData, res: Response, next: NextFunction) => {
  const accesToken = req.headers.authorization?.split(' ')[1];
  try {
    const datAtToken = await jwt.verify(accesToken as string, process.env.JWT_SECRET as string) as IDataInToken;
    if (datAtToken){ 
      req.userId=datAtToken.userId;
      req.email=datAtToken.email
      req.isAdmin=datAtToken.isAdmin;
     return next();
    }
  } catch {
    return next(new CustomError('invalid access token',StatusCodes.UNAUTHORIZED));
  }
};  
export default authenticate;
