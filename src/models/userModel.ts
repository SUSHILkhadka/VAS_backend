import User, { UserWithoutId } from '../domain/user';
import logger from '../misc/logger';
import users from '../users.json';
import { StatusCodes } from 'http-status-codes';

import fs from 'fs';
import { USERS_LIST_FILE } from '../constants/common';
import CustomError from '../misc/CustomError';

export const getAllUsers = async (): Promise<User[]> => {
  // return new Promise((resolve,reject)=>{
  //     resolve(users)
  // });
  return users;
};

export const getUser = async (id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    const requiredUser = users.find((user) => user.id === id);
    if (requiredUser) {
      resolve(requiredUser);
    } else {
      logger.info(`couldnot find specified userid=${id}, in usermodel`);
      // reject(new Error("user not found in reject function"))
      reject(new CustomError('User not found', StatusCodes.NOT_FOUND));
    }
  });
};

export const createUser = async (user: UserWithoutId): Promise<User> => {
  return new Promise((resolve, reject) => {
    const toBeAddedUser = { id: Date.now(), ...user };

    users.push(toBeAddedUser);

    //write to file
    fs.writeFileSync(USERS_LIST_FILE, JSON.stringify(users), 'utf8');
    resolve(toBeAddedUser);
  });
};

export const updateUser = async (user: User): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const otherUsers = users.filter((value) => value.id != user.id);
    const updatedUsers = [...otherUsers, user];

    //write to file
    fs.writeFileSync(USERS_LIST_FILE, JSON.stringify(updatedUsers), 'utf8');
    resolve(updatedUsers);
  });
};
export const deleteUser = async (id: number): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const otherUsers = users.filter((value) => value.id != id);
    //write to file
    fs.writeFileSync(USERS_LIST_FILE, JSON.stringify(otherUsers), 'utf8');
    resolve(otherUsers);
  });
};
