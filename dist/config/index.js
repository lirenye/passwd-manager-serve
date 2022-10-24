"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConf = exports.options = exports.privateKey = exports.dbURI = exports.mongoConf = exports.port = void 0;
exports.port = 3000;
exports.mongoConf = {
    user: 'root',
    pass: '123456',
    authSource: 'admin'
};
exports.dbURI = 'mongodb://localhost:27017/passwdmanager';
exports.privateKey = 'JD23K2H35K2';
exports.options = {
    expiresIn: '1h'
};
// nodemail
exports.emailConf = {
    host: "smtp.126.com",
    port: 465,
    // if encrypt connect set true and port is 465
    secure: true,
    // DBCWEUNDFJGNVGKF
    // auth
    user: 'l2694613297@126.com',
    pass: 'DBCWEUNDFJGNVGKF'
};
