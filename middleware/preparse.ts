// parse token get user info

import { Response, NextFunction } from "express";
import { Req } from "../module";
import { verifyToken } from "../utils/jwt";


export function parseToken(req: Req, res: Response, next: NextFunction){
  const token = req.headers.authorization!;
  if(req.path === '/login') return next();
  
  try {
    req.token = verifyToken(token);
  } catch (error) {
    return res.send({data: null, meta: {
      status: 401,
      msg: '认证过期'
    }});
  }
  next();
}