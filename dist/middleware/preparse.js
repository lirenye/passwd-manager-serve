"use strict";
// parse token get user info
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToken = void 0;
const jwt_1 = require("../utils/jwt");
function parseToken(req, res, next) {
    const token = req.headers.authorization;
    const connection = ['/login', '/test'];
    if (connection.indexOf(req.path) !== -1)
        return next();
    try {
        (0, jwt_1.verifyToken)(token);
    }
    catch (error) {
        return res.send({ data: null, meta: {
                status: 401,
                msg: '认证过期'
            } });
    }
    next();
}
exports.parseToken = parseToken;
