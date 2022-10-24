import { sign, verify, JwtPayload } from "jsonwebtoken";
import { privateKey, options } from "../config";
import { UserDocument } from "../models/user.model";

export function signToken(payload: any){
  console.log(payload)
  return sign(payload, privateKey, options);
};

interface UserInfo extends JwtPayload {
  _id: string;
  username: string;
}

export function verifyToken(token: string){
  const data: UserInfo = verify(token, privateKey) as UserInfo;
  return data;
};

export default { signToken, verifyToken}