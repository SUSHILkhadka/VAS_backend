interface Success<T> {
  data?: T | T[];
  accessToken?: string;
  message: string;
}
export default Success;
