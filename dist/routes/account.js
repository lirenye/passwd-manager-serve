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
const account_model_1 = __importDefault(require("../models/account.model"));
const jwt_1 = require("../utils/jwt");
const AccountRouter = (0, express_1.Router)();
// 添加账户信息接口
AccountRouter.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, jwt_1.verifyToken)(req.headers.authorization);
    const saveData = Object.assign(req.body, { author: token._id });
    // 检验数据
    try {
        yield new account_model_1.default(saveData).validate();
    }
    catch (error) {
        return res.send({ data: error, meta: { status: 201, msg: '参数未通过验证' } });
    }
    ;
    // 存储数据
    try {
        yield account_model_1.default.create(req.body);
    }
    catch (error) {
        return res.send({ data: null, meta: { status: 201, msg: '存储失败' } });
    }
    ;
    return res.send({ data: null, meta: { status: 200, msg: '保存成功' } });
}));
;
AccountRouter.get('/info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqQuery = req.query;
    const { _id } = (0, jwt_1.verifyToken)(req.headers.authorization);
    const queryFilter = { [reqQuery.type]: {
            $regex: new RegExp(reqQuery.value, 'i')
        } };
    // queryFilter[reqQuery.type!] = { $regex: new RegExp(reqQuery.value!, 'i')}
    // 检验参数
    const allow = ['platform', 'mobile', 'email'];
    const queryType = Object.keys(queryFilter);
    if (allow.indexOf(queryType[0]) === -1)
        return res.send({ data: null, meta: { status: 201, msg: '查询参数错误' } });
    // 查询规则
    const queryData = Object.assign(queryFilter, { author: _id });
    console.log(queryData);
    // 查询数据
    try {
        var dbData = yield account_model_1.default.find(queryData);
    }
    catch (error) {
        return res.send({ data: null, meta: { status: 201, msg: '查询错误' } });
    }
    ;
    // 返回查询数据
    return res.send({ data: dbData, total: dbData.length, meta: { status: 200, msg: '查询成功' } });
}));
// 修改账户信息接口
AccountRouter.post('/modify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parse token info
    const { _id: userId } = (0, jwt_1.verifyToken)(req.headers.authorization);
    // handle request params
    const account = Object.assign({}, req.body);
    const accountId = account._id;
    delete account['_id'];
    account['author'] = userId;
    // validation request params
    try {
        yield new account_model_1.default(account).validate();
    }
    catch (error) {
        return res.send({ data: error, meta: { status: 201, msg: '参数未通过验证' } });
    }
    ;
    // delete author
    delete account['author'];
    // go update account info
    try {
        const { acknowledged } = yield account_model_1.default.updateOne({ _id: accountId, author: userId }, { $set: account });
        if (acknowledged)
            return res.send({ data: null, meta: { status: 200, msg: '修改成功' } });
        else
            return res.send({ data: null, meta: { status: 201, msg: '修改失败' } });
    }
    catch (error) {
        return res.send({ data: null, meta: { status: 200, msg: '修改失败' } });
    }
    ;
}));
// 删除账户信息接口
AccountRouter.get('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parse token info
    const { _id: userId } = (0, jwt_1.verifyToken)(req.headers.authorization);
    // get account ObjectId
    const accountId = req.query._id;
    // validation accountId
    if (!accountId)
        return res.send({ data: null, meta: { status: 201, msg: '删除失败' } });
    // delete account info
    try {
        const { acknowledged, deletedCount } = yield account_model_1.default.deleteOne({ _id: accountId, author: userId });
        if (acknowledged && deletedCount == 1)
            return res.send({ data: null, meta: { status: 200, msg: '删除成功' } });
        else
            return res.send({ data: null, meta: { status: 201, msg: '删除失败' } });
    }
    catch (error) {
        res.send({ data: null, meta: { status: 201, msg: '删除失败' } });
    }
}));
exports.default = AccountRouter;
