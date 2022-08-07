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
    return user;
  }

  public static async getUserByEmail(email: string): Promise<User> {
    const user = await db(this.table).where('email', email).first();
    return user;
  }

  public static async createUser(user: UserWithoutId): Promise<User[]> {
    try{
    const addedUser = await db(UserAccount.table).insert(user, ['id', 'name', 'email','password']);
    return addedUser;
    }
    catch(e:any){
      console.log('got error: ',e.detail)
      const addedUser:User[]=[]
      return addedUser;
    }
  }
  public static async updateUser(user: User): Promise<User[]> {
    const updatedUser = await db(this.table).where('id', user.id).update(user, ['id', 'email', 'name','password']);
    return updatedUser;
  }

  public static async deleteUser(id: number): Promise<User[]> {
    const deletedUser = await db(this.table).where('id', id).del(['id', 'name', 'email','password']);

    const users = await db(this.table).select();
    console.log('after deletion', deletedUser);

    return users;
  }
}

export default UserAccount;
