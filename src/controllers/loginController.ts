import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IRequestWithTokenData from '../domain/IRequestWithTokenData';
import CustomError from '../misc/CustomError';
import * as loginService from '../services/loginService';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError('Email and password is required', StatusCodes.BAD_REQUEST));
  }
  loginService.login(email, password).then((data) => res.json(data));
};
export const getAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(new CustomError('refreshToken is missing', StatusCodes.BAD_REQUEST));
  }
  loginService
    .getNewAccessToken(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const logout = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(new CustomError('refreshToken is missing or token is bad', StatusCodes.BAD_REQUEST));
  }
  loginService
    .logout(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
