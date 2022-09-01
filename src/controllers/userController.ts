import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IRequestWithTokenData from '../domain/IRequestWithTokenData';
import CustomError from '../misc/CustomError';
import * as userService from '../services/userService';

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  userService
    .getUser(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, isAdmin } = req.body;
  userService
    .createUser({ name, email, password, isAdmin })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;
  if (!name || !email || !password) {
    return next(new CustomError('name,email,password,userId is required', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin) {
    userService
      .updateUser({ name, email, id: +userId, password })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } else {
    if (req.userId)
      userService
        .updateUser({ name, email, id: +req.userId, password })
        .then((data) => res.json(data))
        .catch((err) => next(err));
    else {
      return next(new CustomError('invalid token', StatusCodes.BAD_REQUEST));
    }
  }
};

export const deleteUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (!req.isAdmin) {
    userService
      .deleteUser(+userId)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } else {
    if (req.userId)
      userService
        .deleteUser(+req.userId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
    else {
      return next(new CustomError('invalid token', StatusCodes.BAD_REQUEST));
    }
  }
};
