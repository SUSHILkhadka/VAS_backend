// basically controller= promise handler
import { NextFunction, Request, Response } from 'express';
import logger from '../misc/logger';
import * as userService from '../services/userService';

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  userService.getAllUsers().then((data) => res.json(data));
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  console.log('req.params==', req.params);
  console.log('id===', id);
  userService.getUser(+id).then((data) => res.json(data));
};
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { name, email } = req.body;
  console.log('{name,email}==', { name, email });
  userService.createUser({ name, email }).then((data) => res.json(data));
};
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;
  const { userId } = req.params;

  if (!userId || !name || !email) {
    logger.error('data missing');
  }
  userService.updateUser({ name, email, id: +userId }).then((data) => res.json(data));
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  if (!userId) {
    logger.error('data missing');
  }
  userService.deleteUser(+userId).then((data) => res.json(data));
};
