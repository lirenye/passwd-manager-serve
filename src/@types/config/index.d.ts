export declare const port: number;
import { ConnectOptions } from "mongoose";
export declare const mongoConf: ConnectOptions;
export declare const dbURI: string;
import { Secret, SignOptions } from "jsonwebtoken";
export declare const privateKey: Secret;
export declare const options: SignOptions;
export declare const emailConf: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
};
