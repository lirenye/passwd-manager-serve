import mongoose from "mongoose";
export interface Account {
    author: string;
    platform: string;
    username: string;
    password: string;
    email: string;
    mobile: string;
    remark: string;
}
export declare const AccountSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    username: string;
    password: string;
    email: string;
    author: string;
    platform: string;
    mobile: string;
    remark: string;
}>;
declare const AccountModel: mongoose.Model<{
    username: string;
    password: string;
    email: string;
    author: string;
    platform: string;
    mobile: string;
    remark: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    username: string;
    password: string;
    email: string;
    author: string;
    platform: string;
    mobile: string;
    remark: string;
}>>;
export default AccountModel;
