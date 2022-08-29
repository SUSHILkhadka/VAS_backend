import { Request } from "express";

interface IRequestWithTokenData extends Request{
    userId?: number;
    isAdmin?: boolean;
}
export default IRequestWithTokenData;

export interface IDataInToken{
    userId: number;
    isAdmin: boolean;
}