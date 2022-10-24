// parse token get user info

import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


export function parseToken(req: Request, res: Response, next: NextFunction){
  const token = req.headers.authorization!;
  const connection = ['/login', '/test', '/code']
  if(connection.indexOf(req.path) !== -1) return next();
  
  try {
    verifyToken(token);
  } catch (error) {
    return res.send({data: null, meta: {
      status: 401,
      msg: '认证过期'
    }});
  }
  next();
}