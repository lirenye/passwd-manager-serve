import { Response, Request, NextFunction, Router } from "express";
import UserModel from "../models/user.model";
import { verifyToken } from "../utils/jwt";

const UserRouter = Router();

UserRouter.post('/modifypassword', async (req: Request, res: Response, next: NextFunction)=>{
  const password = req.body.password;
  const token = req.headers.authorization;
  // 从token获取用户信息
  const {_id, username} = verifyToken(token!);
  // 更新数据库信息
  try {
    await UserModel.updateOne({_id, username }, {password});
  } catch (error) {
    console.log(error);
    console.log('修改密码数据库操作失败');
  };
  res.send({data: null, meta: {status: 200, msg: '修改密码成功'}});
});


UserRouter.post('/modifyemail', async (req: Request, res: Response, next: NextFunction)=>{
  const email = req.body.email;
  const token = req.headers.authorization;
  // 从token获取用户信息
  const {_id, username} = verifyToken(token!);
  // 更新数据库信息
  try {
    await UserModel.updateOne({_id, username}, {email});
  } catch (error) {
    console.log(error);
    console.log('更新电子邮箱操作出错');
  };
  // 返回信息
  res.send({data: null, meta: {status: 200, msg: '电子邮箱修改成功'}});
})


export default UserRouter;