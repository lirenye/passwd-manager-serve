"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const UserRouter = (0, express_1.Router)();
UserRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.keys(req.body).length)
        return res.send({ data: null, meta: { status: 201, msg: '没有参数' } });
    // 请求数据检测
    try {
        yield new user_model_1.default(req.body).validate();
    }
    catch (err) {
        return res.send({ data: err, meta: {
                status: 201,
                msg: '参数未通过检查'
            } });
    }
    // 获取用户信息
    // const data = await UserModel.create(req.body);
    const data = yield user_model_1.default.find(req.body);
    // 查询无结果
    if (!(data.length))
        return res.send({ data: null, meta: {
                status: 201,
                msg: '账号或密码错误'
            } });
    // get token
    const { _id, username, password } = data[0];
    const token = (0, jwt_1.signToken)({ _id, username, password });
    return res.send({ data: { token }, meta: { status: 200, msg: '登陆成功' } });
}));
;
UserRouter.post("/code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取用户信息
    const userInfo = req.body;
    // 验证用户信息
    const dbUserData = yield user_model_1.default.find(userInfo);
    if (!dbUserData.length)
        return res.send({ data: null, meta: { status: 201, msg: 'validaton is error' } });
    // 获取验证码
    let code = '';
    function getCode(len) {
        if (code.length === len) {
            return;
        }
        else {
            const math = Math.ceil(Math.random() * 10);
            code += math;
            getCode(len);
        }
    }
    ;
    getCode(6);
    return res.send(code);
    // 获取允许下次请求时间
    // const err = await sendEmail('2694613297@qq.com', '123456');
    // if(err) return res.send('验证码发送失败');
    // return res.send('验证码发送成功');
}));
exports.default = UserRouter;
