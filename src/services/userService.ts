import Success from '../domain/Success';
import User, { UserWithoutId } from '../domain/user';
import logger from '../misc/logger';
// import * as userModel from '../models/userModel';
import UserAccount from '../modelsV2/userAccount';
import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constants/common';
import jwt from 'jsonwebtoken';
// import Token from "../domain/Token";

export const getAllUsers = async (): Promise<Success<User[]>> => {
  logger.info('getting all users . In userService');
  //   const users = await userModel.getAllUsers();
  const users = await UserAccount.getAllUsers();

  return {
    data: users,
    message: 'all users fetched successfully. In userService.',
  };
};
export const getUser = async (id: number): Promise<Success<User>> => {
  logger.info(`getting a user by id=${id}. In userService`);
  let user;
  try {
    // user = await userModel.getUser(+id);
    user = await UserAccount.getUser(+id);
  } catch {
    console.log('not found');
  }

  return {
    data: user,
    message: 'specified user by id fetched successfully. In userService.',
  };
};
export const login = async (email: string, password: string): Promise<Success<User>> => {
  logger.info(`getting a user by email=${email}. In userService`);
  let user;
  try {
    // user = await userModel.getUser(+id);
    user = await UserAccount.getUserByEmail(email);
  } catch {
    console.log('not found');
  }

  if (!user) {
    return {
      message: 'no email found',
    };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      message: 'wrong password',
    };
  }

  //right user
  const accessToken = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET as string);
  return {
    data: user,
    accessToken: accessToken,
    message: 'Correct password. specified user by id,password fetched successfully and Retured token. In userService.',
  };
};

export const createUser = async (body: UserWithoutId): Promise<Success<User>> => {
  logger.info('adding a new user. In userService');
  const { password } = body;
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await UserAccount.createUser({
    ...body,
    password: passwordHash,
  });
  logger.info('added a user sucess. In userService');
  if (typeof user == 'string') {
    return {
      message: user,
    };
  }
  return {
    data: user,
    message: 'User created successfully. In userService.',
  };
};

export const updateUser = async (user: User): Promise<Success<User[]>> => {
  logger.info(`updating user of id=${user.id}. In userService`);
  //   const updatedList = await userModel.updateUser(user);
  const updatedList = await UserAccount.updateUser(user);
  logger.info('update a user . In userService');
  return {
    data: updatedList,
    message: 'User updated successfully. In userService.',
  };
};
export const deleteUser = async (id: number): Promise<Success<User[]>> => {
  logger.info(`deleting user of id=${id}. In userService`);
  //   const updatedList = await userModel.deleteUser(id);
  const updatedList = await UserAccount.deleteUser(id);

  logger.info('deleted a user . In userService');
  return {
    data: updatedList,
    message: 'User deleted successfully.Above is remaining data. In userService.',
  };
};
