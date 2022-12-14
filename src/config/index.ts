export const port: number = 3000;

// mongodb
import { ConnectOptions } from "mongoose";
export const mongoConf: ConnectOptions = {
  user: 'root',
  pass: '123456',
  authSource: 'admin'
};
export const dbURI: string = 'mongodb://localhost:27017/passwdmanager'

// jsonwebtoken
import { Secret, SignOptions } from "jsonwebtoken";
export const privateKey: Secret = 'JD23K2H35K2';
export const options: SignOptions ={
  // token 有效时间
  expiresIn: '1h'
};

// nodemail
export const emailConf = {
  host: "smtp.126.com",
  port: 465,
  // if encrypt connect set true and port is 465
  secure: true,

  // auth
  // 邮箱账户
  user: '',
  // 开启第三方登陆时提供的密码
  pass: ''
}

// 验证码过期时间
export const CodeExpiration: number = 60000; // 毫秒