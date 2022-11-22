import { Response, Request, Router, NextFunction } from "express";
import AccountModel from "../models/account.model";
import { verifyToken } from "../utils/jwt";
import { Decrypt, Encrypt } from "../utils/simple-crypto";
import LocalTime, { FormatLog } from "../utils/time";

const AccountRouter = Router();

// 账户信息接口
interface DBAccountInterface {
  _id: string;
  platform: string;
  mobile: string;
  email: string;
  author: string;
  username: string;
  password: string;
  remark: string;
}

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
interface QueryAccountRequestInterface {
  type: 'platform' | 'mobile' | 'email';
  value: string
}
AccountRouter.get('/info', async (req: Request, res: Response)=>{
  // 获取请求数据
  const token = <string>req.headers.authorization;
  const tokenInfo = verifyToken(token);
  const reqData = <string>req.query.data;
  const reqTime = <string>req.headers.time;
  const reqSecret = reqTime;


  // 解密请求数据
  let queryAccountRequestData:QueryAccountRequestInterface;
  try {
    const decryptData = Decrypt(reqSecret, reqData);
    if( decryptData === 'error') throw '账户查询接口解密错误';
    queryAccountRequestData = <QueryAccountRequestInterface>decryptData;
  } catch (error) {
    FormatLog('ERROR', tokenInfo.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '查询错误'}});
  };

  // 格式化数据库查询语句
  const queryFilter = {
    [queryAccountRequestData.type]: {
      $regex: new RegExp(queryAccountRequestData.value)
    }
  };

  // 查询规则
  const queryData = Object.assign(queryFilter, {author:tokenInfo._id});


  // 查询数据
  let dbAccountDataArray:Array<DBAccountInterface>;
  try{
    dbAccountDataArray = await AccountModel.find(queryData);
  }catch(error){
    FormatLog('ERROR', tokenInfo.username, '查询账户接口查询数据错误');
    return res.send({data: null, meta: { status: 201, msg: '查询错误'}})
  };

  // 响应数据准备
  const localTime = LocalTime().toString();
  res.setHeader('Access-Control-Expose-Headers', 'Time');
  res.set({
    'Time': localTime,
    'Content-Type': 'application/json; charset=utf-8'
  });

  // 加密响应数据
  const queryAccountResponseData = Encrypt(localTime, {
    data: dbAccountDataArray,
    total: dbAccountDataArray.length,
    meta: {
      status: 200,
      msg: '查询成功'
    }
  });
  // 返回查询数据
  res.send(queryAccountResponseData);
});



// 修改账户信息接口
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
interface ModifyAccountRequestInterface {
  _id: string;
  author?: string;
  platform: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
  remark: string;
};
AccountRouter.post('/modify',async (req: Request, res: Response)=>{
  // 获取请求数据
  const token = <string>req.headers.authorization;
  const tokenInfo = verifyToken(token);
  const reqData = <string>req.body.data;
  const reqSecret = <string>req.headers.time;
  
  // 解密请求数据
  let modifyAccountRequestData:ModifyAccountRequestInterface;
  try {
    const decryptData = Decrypt(reqSecret, reqData);
    if(decryptData === 'error') throw '修改账户接口解密请求数据错误';
    modifyAccountRequestData = <ModifyAccountRequestInterface>decryptData;
  } catch (error) {
    FormatLog('ERROR', tokenInfo.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '修改失败'}});
  };

  // 修改数据库数据
  try {
    const {acknowledged} = await AccountModel.updateOne(
      {
        _id: modifyAccountRequestData._id,
        author: tokenInfo._id
      },
      {$set: {
        platform: modifyAccountRequestData.platform,
        username: modifyAccountRequestData.username,
        password: modifyAccountRequestData.password,
        email: modifyAccountRequestData.email,
        mobile: modifyAccountRequestData.mobile,
        remark: modifyAccountRequestData.remark
      }}
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