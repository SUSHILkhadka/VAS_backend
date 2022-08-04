import db from '../db/db';
import User, { UserWithoutId } from '../domain/user';

class UserAccount {
  public static table = 'user_account';

  public static async getAllUsers() {
    const users = await db(this.table).select();
    return users;
  }

  public static async getUser(id: number): Promise<User> {
    const user = await db(this.table).where('id', id).first();
    // return JSON.parse(user);
    return user;
  }

  public static async createUser(user: UserWithoutId): Promise<User[]> {
    const addedUser = await db(UserAccount.table).insert(user, ['id', 'name', 'email']);
    return addedUser;
  }
  public static async updateUser(user: User): Promise<User[]> {
    const updatedUser = await db(this.table).where('id', user.id).update(user, ['id', 'email', 'name']);
    return updatedUser;
  }

  public static async deleteUser(id: number): Promise<User[]> {
    const deletedUser = await db(this.table).where('id', id).del(['id', 'name', 'email']);

    const users = await db(this.table).select();
    console.log('after deletion', deletedUser);

    return users;
  }
}

export default UserAccount;
