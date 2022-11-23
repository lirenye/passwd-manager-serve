import { Response, Request, NextFunction, Router } from "express";
import UserModel from "../models/user.model";
import { verifyToken } from "../utils/jwt";
import { Decrypt } from "../utils/simple-crypto";
import { FormatLog } from "../utils/time";

const UserRouter = Router();

// 修改用户密码
interface ModifyPasswordRequestInterface {
  password: string;
}
UserRouter.post('/modifypassword', async (req: Request, res: Response, next: NextFunction)=>{
  // 获取请求数据
  const token = <string>req.headers.authorization;
  const tokenInfo = verifyToken(token);
  const reqData = <string>req.body.data;
  const reqTime = <string>req.headers.time;
  const reqSecret = reqTime;

  // 解密请求数据
  let modifyPasswordRequestData:ModifyPasswordRequestInterface;
  try {
    const decryptData = Decrypt(reqSecret, reqData);
    if(decryptData === 'error') throw '修改密码接口解密请求数据报错';
    modifyPasswordRequestData = <ModifyPasswordRequestInterface>decryptData;
  } catch (error) {
    FormatLog('ERROR', tokenInfo.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '修改密码失败'}});
  };

  // 修改数据库密码数据
  try {
    await UserModel.updateOne(
      {
        _id: tokenInfo._id,
        username: tokenInfo.username
      }, {
        password: modifyPasswordRequestData.password
      }
    );
  } catch (error) {
    FormatLog('ERROR', tokenInfo.username,<string>error);
    return res.send({data: null, meta: {status: 201, msg: '修改密码失败'}});
  };
  res.send({data: null, meta: {status: 200, msg: '修改密码成功'}});
});



// 修改用户电子邮箱
interface ModifyEmailRequestInterface {
  email: string;
}
UserRouter.post('/modifyemail', async (req: Request, res: Response, next: NextFunction)=>{
  // 获取请求数据
  const token = <string>req.headers.authorization;
  const tokenInfo = verifyToken(token);
  const reqData = <string>req.body.data;
  const reqTime = <string>req.headers.time;
  const reqSecret = reqTime;

  // 解密请求数据
  let modifyEmalRequestData:ModifyEmailRequestInterface;
  try {
    const decryptData = Decrypt(reqSecret, reqData);
    if(decryptData === 'error') throw '修改用户电子邮箱接口解密请求数据失败';
    modifyEmalRequestData = <ModifyEmailRequestInterface>decryptData;
  } catch (error) {
    FormatLog('ERROR', tokenInfo.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '电子邮箱修改失败'}});
  };

  // 更新数据库信息
  try {
    await UserModel.updateOne(
      {
        _id: tokenInfo._id,
        username: tokenInfo.username
      },
      {
        email: modifyEmalRequestData.email
      }
    );
  } catch (error) {
    FormatLog('ERROR', tokenInfo.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '电子邮箱修改失败'}});
  };
  // 返回信息
  res.send({data: null, meta: {status: 200, msg: '电子邮箱修改成功'}});
})


export default UserRouter;