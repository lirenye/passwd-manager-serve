import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  username: string
  password: string
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '没有用户名'],
      minLength: [4, '用户名小于4个字符'],
      maxLength: [6, '用户名大于6个字符'],
      trim: true
    },
    password: {
      type: String,
      required: [true, '没有密码'],
      minLength: [6, '密码小于6个字符'],
      maxLength: [10, '密码大于10个字符'],
      trim: true
    }
  }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;