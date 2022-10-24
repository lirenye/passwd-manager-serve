"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const account_1 = __importDefault(require("./account"));
function routes(app) {
    app.get('/', (req, res) => {
        res.send('server ok');
    });
    app.use('/', login_1.default);
    app.use('/account', account_1.default);
}
;
exports.default = routes;
