import { Response, Request, Router, NextFunction } from "express";
import AccountModel from "../models/account.model";
import { verifyToken } from "../utils/jwt";

const AccountRouter = Router();

// 添加账户信息接口
AccountRouter.post('/add',async (req: Request, res: Response, next: NextFunction)=>{
  const token = verifyToken(req.headers.authorization!);
  const saveData = Object.assign(req.body,{ author: token._id});
  // 检验数据
  try {
    await new AccountModel(saveData).validate();
  } catch (error) {
    return res.send({data: error, meta: {status: 201, msg: '参数未通过验证'}});
  };


  // 存储数据
  try {
    await AccountModel.create(req.body);
  } catch (error) {
    return res.send({data: null, meta: {status: 201, msg: '存储失败'}});
  };

  return res.send({data: null, meta: {status: 200, msg: '保存成功'}});
});


// 查询账户信息接口
interface QueryFilter {
  platform?: {
    $regex: RegExp
  };
  mobile?: {
    $regex: RegExp
  };
  email?: {
    $regex: RegExp
  };
};

interface ReqQuery {
  type?: 'platform' | 'mobile' | 'email';
  value?: string;
}
AccountRouter.get('/info', async (req: Request, res: Response)=>{
  const reqQuery: ReqQuery = req.query;
  const {_id} = verifyToken(req.headers.authorization!);
  const queryFilter:QueryFilter = {[reqQuery.type!]: {
    $regex: new RegExp(reqQuery.value!, 'i')
  }};
  // queryFilter[reqQuery.type!] = { $regex: new RegExp(reqQuery.value!, 'i')}
  // 检验参数
  const allow = ['platform', 'mobile', 'email'];
  
  const queryType = Object.keys(queryFilter)
  if(allow.indexOf(queryType[0]) === -1) return res.send({data: null, meta: {status: 201, msg: '查询参数错误'}});

  // 查询规则
  const queryData = Object.assign(queryFilter, {author:_id});
  console.log(queryData);
  // 查询数据
  try{
    var dbData = await AccountModel.find(queryData);
  }catch(error){
    return res.send({data: null, meta: { status: 201, msg: '查询错误'}})
  };

  // 返回查询数据
  return res.send({data: dbData, total: dbData.length, meta: {status: 200, msg: '查询成功'}})
});

interface ReqModify {
  _id?: string;
  author?: string;
  platform: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
  remark: string;
}

// 修改账户信息接口
AccountRouter.post('/modify',async (req: Request, res: Response)=>{
  // parse token info
  const {_id: userId} = verifyToken(req.headers.authorization!);

  // handle request params
  const account:ReqModify = {...req.body};
  const accountId = account._id;
  delete account['_id'];
  account['author'] = userId;

  // validation request params
  try {
    await new AccountModel(account).validate();
  } catch (error) {
    return res.send({data: error, meta: {status: 201, msg: '参数未通过验证'}});
  };

  // delete author
  delete account['author'];

  // go update account info
  try {
    const {acknowledged} = await AccountModel.updateOne(
      {_id: accountId, author: userId},
      {$set: account}
    );
    if(acknowledged) return res.send({data: null, meta: {status: 200, msg: '修改成功'}});
    else return res.send({data: null, meta: {status: 201, msg: '修改失败'}});
  } catch (error) {
    return res.send({data: null, meta: {status: 200, msg: '修改失败'}});
  };
});

// 删除账户信息接口
AccountRouter.get('/delete', async (req: Request, res: Response)=>{
  // parse token info
  const {_id: userId} = verifyToken(req.headers.authorization!);
  // get account ObjectId
  const accountId: string = req.query._id as string;

  // validation accountId
  if(!accountId) return res.send({data: null, meta: {status: 201, msg: '删除失败'}});

  // delete account info
  try {
    const {acknowledged, deletedCount} = await AccountModel.deleteOne({_id: accountId, author: userId});
    if(acknowledged && deletedCount == 1) return res.send({data: null, meta: {status: 200, msg: '删除成功'}});
    else return res.send({data: null, meta: {status: 201, msg: '删除失败'}});
  } catch (error) {
    res.send({data: null, meta: {status: 201, msg: '删除失败'}});
  }
})


export default AccountRouter;