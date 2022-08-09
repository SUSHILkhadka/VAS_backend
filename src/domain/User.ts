interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
export default User;

export interface UserWithoutId {
  name: string;
  email: string;
  password: string;
}
