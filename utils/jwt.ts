import { sign, verify } from "jsonwebtoken";
import { privateKey, options } from "../config";
import { UserDocument } from "../models/user.model";

export function signToken(payload: any){
  console.log(payload)
  return sign(payload, privateKey, options);
};

export function verifyToken(token: string){
  return verify(token, privateKey);
};

export default { signToken, verifyToken}