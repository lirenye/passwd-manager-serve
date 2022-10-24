"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.AccountSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        required: [true, '没有所属者']
    },
    platform: {
        type: String,
        required: [true, '没有平台名称'],
        maxLength: [10, '平台名词大于10个字符'],
        trim: true
    },
    username: {
        type: String,
        required: [true, '没有用户名'],
        maxLength: [16, '用户名大于16个字符'],
        trim: true
    },
    password: {
        type: String,
        required: [true, '没有密码'],
        maxLength: [20, '密码大于20个字符'],
        trim: true
    },
    email: {
        type: String,
        required: false,
        maxLength: [20, '邮箱地址大于20个字符'],
        default: '',
        trim: true
    },
    mobile: {
        type: String,
        required: false,
        maxLength: [11, '电话号码只有11个字符'],
        default: '',
        trim: true
    },
    remark: {
        type: String,
        required: false,
        maxLength: [30, '备注信息最大30个字符'],
        default: '',
        trim: true
    }
});
const AccountModel = mongoose_1.default.model('account', exports.AccountSchema);
exports.default = AccountModel;
