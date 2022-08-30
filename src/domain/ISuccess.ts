interface ISuccess<T> {
  data?: T | T[];
  accessToken?: string;
  refreshToken?: string;
  message: string;
}
export default ISuccess;
