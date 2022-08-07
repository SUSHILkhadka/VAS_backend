import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate =async (req: Request, res: Response, next: NextFunction) => {
    console.log("in authenticate middleware");
    const accesTokenByReactAsHeader=req.headers.authorization?.split(" ")[1];
    try{
    const pass=await jwt.verify(accesTokenByReactAsHeader as string,process.env.JWT_SECRET as string)
    if(pass)
    next();
    }
    catch{
        return res.send('not authorized');
    }
};
export default authenticate;