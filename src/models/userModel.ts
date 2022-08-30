import db from "../db/db";
import IUser, { IUserToInsert } from "../domain/IUser";

class UserAccount {
  public static table = "user_account";

  public static async getAllUsers(): Promise<IUser[]> {
    const users = await db(this.table).select().returning("*");
    return users;
  }

  public static async getUser(id: number): Promise<IUser> {
    const user = await db(this.table).where("id", id).returning("*").first();
    return user;
  }

  public static async getUserByEmail(email: string): Promise<IUser> {
    const user = await db(this.table)
      .where("email", email)
      .returning("*")
      .first();
    return user;
  }

  public static async createUser(
    user: IUserToInsert
  ): Promise<IUser[] | string> {
    try {
      const addedUser = await db(UserAccount.table).insert(user).returning("*");
      return addedUser;
    } catch (e: any) {
      console.log("got error: ", e.detail);
      return e.detail;
    }
  }

  public static async updateUser(user: IUser): Promise<IUser> {
    const updatedUser = await db(this.table)
      .where("id", user.id)
      .update(user)
      .returning("*");
    return updatedUser[0];
  }

  public static async deleteUser(id: number): Promise<IUser> {
    const deletedUser = await db(this.table)
      .where("id", id)
      .del()
      .returning("*");
    return deletedUser[0];
  }
}

export default UserAccount;
