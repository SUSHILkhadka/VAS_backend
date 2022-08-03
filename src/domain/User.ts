interface User {
  id: number;
  name: string;
  email: string;
}
export default User;

export interface UserWithoutId {
  name: string;
  email: string;
}
