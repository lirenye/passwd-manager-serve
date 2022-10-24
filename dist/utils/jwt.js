"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
function signToken(payload) {
    console.log(payload);
    return (0, jsonwebtoken_1.sign)(payload, config_1.privateKey, config_1.options);
}
exports.signToken = signToken;
;
function verifyToken(token) {
    const data = (0, jsonwebtoken_1.verify)(token, config_1.privateKey);
    return data;
}
exports.verifyToken = verifyToken;
;
exports.default = { signToken, verifyToken };
