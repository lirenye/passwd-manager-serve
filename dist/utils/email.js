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
exports.verifyMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = require("../config/index");
const logger_1 = __importDefault(require("./logger"));
const tranporter = nodemailer_1.default.createTransport({
    host: index_1.emailConf.host,
    port: index_1.emailConf.port,
    secure: index_1.emailConf.secure,
    auth: {
        user: index_1.emailConf.user,
        pass: index_1.emailConf.pass
    }
});
// verify connection
function verifyMailer() {
    return __awaiter(this, void 0, void 0, function* () {
        const err = yield new Promise((resolve, rejects) => {
            tranporter.verify((err) => {
                if (err) {
                    // console.log(err)
                    resolve(err);
                }
                else {
                    resolve(null);
                }
            });
        });
        if (err)
            return logger_1.default.error('邮箱连接失败');
        else
            return logger_1.default.info('邮箱连接成功');
    });
}
exports.verifyMailer = verifyMailer;
function sendCode(toEmail, code) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejects) => {
            if (!toEmail)
                return rejects('没有电子邮箱');
            if (!code)
                return rejects('没有验证码');
            tranporter.sendMail({
                from: `"passwd-Manager"${index_1.emailConf.user}`,
                to: toEmail,
                subject: '验证码',
                text: 'text 文本测试',
                html: `<h1>验证码为：<span>${code}</span></h1>`
            }, (err) => {
                resolve(err);
            });
        });
    });
}
exports.default = sendCode;
