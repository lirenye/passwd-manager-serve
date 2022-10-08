import { Response, Request, Router } from "express";
import AccountModel from "../models/account.model";
import logger from "../utils/logger";

const AccountRouter = Router();

// 添加账户信息接口
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


// 查询账户信息接口
AccountRouter.get('/info', async (req: Request, res: Response)=>{
  // 检验参数
  const allow = ['platform', 'mobile', 'email'];
  const queryType = Object.keys(req.body)
  if(allow.indexOf(queryType[0]) === -1) return res.send({data: null, meta: {status: 201, msg: '查询参数错误'}});

  // 查询数据
  try{
    var dbData = await AccountModel.find(req.body)
  }catch(error){
    return res.send({data: null, meta: { status: 201, msg: '查询错误'}})
  };

  // 返回查询数据
  return res.send({data: dbData, total: dbData.length, meta: {status: 200, msg: '查询成功'}})
});


export default AccountRouter;