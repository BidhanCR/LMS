// auth.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { CatchAsyncError } from "./CatchAsyncError";
import { CustomRequest } from "../@types/custom";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";



// authenticated user
export const isAuthenticated = CatchAsyncError(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    console.log('req.cookies', req.cookies)
    if (!access_token) {
        return next(new ErrorHandler("Please log in to access this resource", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    if (!decoded) {
        return next(new ErrorHandler("Access token is not valid", 400))
    }

    const user = await redis.get(decoded.id);
    console.log("user", user)
    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }
    req.user = JSON.parse(user);
    next();
});

// validate user role
// export const authorizedRoles = (...roles: string[]) => {
//     return (req: CustomRequest, res: Response, next: NextFunction) => {
//         if (!roles.includes(req.user?.role || "")) {
//             return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403))
//         }
//         next();
//     }
// };