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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = __importDefault(require("./middleware"));
const logger_1 = __importDefault(require("./utils/logger"));
const email_1 = require("./utils/email");
const app = (0, express_1.default)();
(0, middleware_1.default)(app);
// global.logger = 'sdfsf's
app.listen(config_1.port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    yield (0, email_1.verifyMailer)();
    (0, routes_1.default)(app);
    // console.log(`server start at http://localhost:${port}`)
    logger_1.default.info(`server start at http://localhost:${config_1.port}`);
    // console.log(logger)
}));
