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
  expiresIn: 60
}