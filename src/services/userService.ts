import Success from "../domain/ISuccess";
import User, { IUserToInsert } from "../domain/IUser";
import logger from "../misc/logger";
import UserAccount from "../models/userModel";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../constants/common";
import IUser from "../domain/IUser";

export const getAllUsers = async (): Promise<Success<IUser[]>> => {
  logger.info("getting all users . In userService");
  const users = await UserAccount.getAllUsers();
  return {
    data: users,
    message: "all users fetched successfully. In userService.",
  };
};

export const getUser = async (id: number): Promise<Success<IUser>> => {
  logger.info(`getting a user by id=${id}. In userService`);
  let user;
  try {
    // user = await userModel.getUser(+id);
    user = await UserAccount.getUser(+id);
  } catch {
    console.log("not found");
  }
  return {
    data: user,
    message: "specified user by id fetched successfully. In userService.",
  };
};

export const createUser = async (
  body: IUserToInsert
): Promise<Success<User>> => {
  logger.info("adding a new user. In userService");
  const { password } = body;
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await UserAccount.createUser({
    ...body,
    password: passwordHash,
  });
  logger.info("added a user sucess. In userService");
  if (typeof user == "string") {
    return {
      message: user,
    };
  }
  return {
    data: user,
    message: "User created successfully. In userService.",
  };
};

export const updateUser = async (user: IUser): Promise<Success<IUser>> => {
  logger.info(`updating user of id=${user.id}. In userService`);
  const updatedList = await UserAccount.updateUser(user);
  logger.info("update a user . In userService");
  return {
    data: updatedList,
    message: "User updated successfully. In userService.",
  };
};
export const deleteUser = async (id: number): Promise<Success<IUser>> => {
  logger.info(`deleting user of id=${id}. In userService`);
  const updatedList = await UserAccount.deleteUser(id);
  logger.info("deleted a user . In userService");
  return {
    data: updatedList,
    message:
      "User deleted successfully.Above is remaining data. In userService.",
  };
};
