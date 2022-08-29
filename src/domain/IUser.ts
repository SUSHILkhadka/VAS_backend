interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
export default IUser;

export interface IUserToInsert {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
