import { Response, Request, Router } from "express";
import AccountModel from "../models/account.model";
import logger from "../utils/logger";

const AccountRouter = Router();

AccountRouter.post('/add',async (req: Request, res: Response)=>{
  // 检验数据
  try {
    await new AccountModel(req.body).validate();
  } catch (error) {
    return res.send({data: null, meta: {status: 201, mes: '参数未通过验证'}});
  };

  // 存储数据
  try {
    await AccountModel.create(req.body);
  } catch (error) {
    return res.send({data: null, meta: {status: 201, mes: '存储失败'}});
  };

  return res.send({data: null, meta: {status: 200, mes: '保存成功'}});
});



export default AccountRouter;