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
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./models/user.model");
const account_model_1 = require("./models/account.model");
const config_1 = require("./config");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // 连接数据库
        const connection = mongoose_1.default.createConnection(config_1.dbURI, config_1.mongoConf);
        const user = connection.model('user', user_model_1.UserSchema);
        const accout = connection.model('account', account_model_1.AccountSchema);
        // 创建新用户
        // await createUser({username: '', password: ''});
        // 验证用户信息
        // await validUser({username: 'qwqwqwqw',password: '123456'})
        // console.log(new user({
        //   username: 'lirenye',
        //   password: '123456',
        //   email: '2694613297@qq.com',
        //   code: '123456',
        //   CodeLastTime: '1234623423'
        // }).validateSync())
        // 查看所有用户信息
        // console.log(await user.find());
        // 修改用户信息
        // console.log(await user.updateOne({username: 'lirenye'},{$set: {
        //   code: '123456',
        //   CodeLastTime: '1234123'
        // }}))
        // 查看账户信息
        // console.log(await accout.find({
        //   author: '63416bbc6fbecdd7704ffd5c',
        //   platform: {
        //     "$regex": /test4/
        //   }
        // }));
        // 修改账户信息
        // console.log(await accout.updateOne(
        //   {_id: "63481675122914f8439945bf"},
        //   {$set: {
        //     password: '222277'
        //   }}
        // ))
        // 删除账户信息
        // console.log(await accout.deleteOne({platform: 'test5'}));
        const date = new Date();
        // 获取当前时间
        // const localTime: number = (date.getTime() + 28800000);
        // const localDate = new Date(localTime);
        // console.log(localDate);
        // 验证码
        const math = Math.random() * 10;
        console.log(Math.floor(math));
        console.log(Math.ceil(math));
        function createUser(userInfo) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    new user(userInfo).validateSync();
                    console.log('新用户信息验证通过');
                    const userData = yield user.create(userInfo);
                    console.log(userData);
                    console.log('新用户创建成功');
                }
                catch (error) {
                    console.error(error);
                    console.error('新用户创建失败');
                }
            });
        }
        ;
        function validUser(userInfo) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield new user(userInfo).validate();
                    console.log('验证通过');
                }
                catch (error) {
                    console.error(error);
                    console.error('验证失败');
                }
            });
        }
        // close db
        yield connection.close();
        console.log('关闭连接中');
    });
})();
// createUer({username: 'lirenye', password: '123456'});
// async function createUer(userInfo: UserDocument) {
//   const createData = await UserModel.create(userInfo);
//   console.log(createData);
// }
