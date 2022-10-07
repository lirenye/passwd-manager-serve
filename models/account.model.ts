import { Document, Schema, Model } from "mongoose";

export interface Account extends Document {
  platform: string,
  username: string,
  password: string,
  email: string,
  mobile: string,
  remark: string
}

const AccountSchema = new Schema(
  {
    platform: {
      type: String,
      required: [true, '没有平台名称'],
      maxLength: [10,  '平台名词大于10个字符'],
      trim: true
    },
    username: {
      type: String,
      required: [true, '没有用户名'],
      maxLength: [10, '用户名大于10个字符'],
      trim: true
    },
    password: {
      type: String,
      required: [true, '没有密码'],
      maxLength: [10, '用户名大于10个字符'],
      trim: true
    },
    email: {
      type: String,
      required: false,
      maxLength: [20, '邮箱地址大于20个字符'],
      trim: true
    },
    mobile: {
      type: String,
      required: false,
      maxLength: [11, '电话号码只有11个字符'],
      trim: true
    },
    remark: {
      type: String,
      required: false,
      maxLength: [30, '备注信息最大30个字符'],
      trim: true
    }
  }
);


const AccountModel = new Model('account', AccountSchema);

export default AccountModel;