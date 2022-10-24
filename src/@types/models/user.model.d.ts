import mongoose from "mongoose";
export interface UserDocument {
    username: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    username: string;
    password: string;
    email: string;
    code?: string | undefined;
    CodeLastTime?: string | undefined;
}>;
declare const UserModel: mongoose.Model<UserDocument, {}, {}, {}, any>;
export default UserModel;
