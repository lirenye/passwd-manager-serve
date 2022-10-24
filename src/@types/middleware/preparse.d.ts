import { Response, Request, NextFunction } from "express";
export declare function parseToken(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
