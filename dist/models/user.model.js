"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
exports.UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, '没有用户名'],
        minLength: [4, '用户名小于4个字符'],
        maxLength: [8, '用户名大于8个字符'],
        trim: true
    },
    password: {
        type: String,
        required: [true, '没有密码'],
        minLength: [6, '密码小于6个字符'],
        maxLength: [10, '密码大于10个字符'],
        trim: true
    },
    email: {
        type: String,
        required: [true, '没有电子游戏'],
        maxLength: [30, '电子邮箱最大30个字符'],
        trim: true
    },
    code: {
        type: String,
        minLength: [6, '验证码小于6个字符'],
        maxLength: [6, '验证码大于6个字符'],
        trim: true
    },
    CodeLastTime: {
        type: String,
        maxLength: [30, '验证码过期时间戳长度大于30个字符'],
        trim: true
    }
});
const UserModel = mongoose_1.default.model('user', exports.UserSchema);
exports.default = UserModel;
