import { Router, Request, Response} from 'express'
import UserModel from '../models/user.model';
import { signToken, verifyToken } from '../utils/jwt';
import sendEmail from '../utils/email'
import LocalTime, { FormatLog } from '../utils/time';
import { Decrypt } from '../utils/simple-crypto';

const LoginRouter = Router()

// 数据库用户信息接口
interface DBUserInfo {
  _id: string,
  username: string,
  password: string,
  email: string,
  code: string
  CodeLastTime: string,
  CodeExpiration: string
}

LoginRouter.post('/login',async (req: Request, res: Response)=>{
  if(!Object.keys(req.body).length) return res.send({data: null, meta:{status: 201, msg: '没有参数'}})
  // 请求数据检测
  // try {
  //   await new UserModel(req.body).validate()
  // } catch (err) {
  //   return res.send({data: err, meta: {
  //     status: 201,
  //     msg: '参数未通过检查'
  //   }});
  // }

  // 获取用户信息
  // const data = await UserModel.create(req.body);
  try {
    var data:Array<DBUserInfo> = await UserModel.find(req.body);
  } catch (error) {
    console.log(error);
    console.log('登陆接口：查询用户信息报错');
  }
  // 查询无结果
  if(!(data!.length)) return res.send({data: null, meta: {
    status: 201,
    msg: '密码账号或验证码错误'
  }});

  // 验证“验证码”是否有效
  const localTime = LocalTime().toString();
  if(data![0].CodeExpiration < localTime) return res.send({data: null, meta: {
    status: 201,
    msg: '验证码已过期'
  }});

  // get token
  const {_id, username} = data![0]
  const token = signToken({_id, username});
  return res.send({data:{token}, meta: {status: 200, msg: '登陆成功'}});
});


// 验证码接口
interface UserInfo {
  username: string,
  password: string,
  code?: string,
};

interface CodeRequestInterface {
  username: string,
  password: string,
  code?: string,
}
LoginRouter.post("/code", async (req: Request, res: Response)=>{
  // 获取基本请求数据
  const ReqTime = <string>req.headers.time;
  const ReqSecrypt = ReqTime;
  const ReqData = <string>req.body.data;

  // 解密请求数据
  let codeRequestData:CodeRequestInterface;
  try {
    const decryptData = Decrypt(ReqSecrypt,ReqData);
    if(decryptData === 'error') throw '验证码接口请求数据解密错误';
    codeRequestData = <CodeRequestInterface>decryptData
  } catch (error) {
    FormatLog('ERROR', codeRequestData!.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: error}});
  };
  
  // 验证用户信息
  let  dbUserData: Array<DBUserInfo>;
  try{
    dbUserData= await UserModel.find({
      username: codeRequestData.username,
      password: codeRequestData.password
    });
    if(!dbUserData.length) return res.send({data:null, meta: {status: 201, msg: '请检查账户信息'}});
  }catch(error){
    FormatLog('ERROR', codeRequestData.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '用户信息查询错误'}});
  };


  // 验证过期时间
  const NowCodeLastTime = LocalTime().toString();
  if(dbUserData![0].CodeLastTime && dbUserData![0].CodeLastTime >= NowCodeLastTime) {
    return res.send({data: null, meta: {status: 201, msg: '请稍后重试'}});
  };

  // 获取验证码
  const random = Math.random()
  let code: string = Math.floor(random * 1000000000).toString();
  // 首个字符为零导致个数不正确的问题
  let codeArr = code.split('');
  function clear(codearr: string[]):(string | ((codearr: string[])=> string)){
    if(codearr.indexOf('0') !== 0){
      return codearr.splice(0,6).join('');
    }else{
      codearr.shift();
      return clear(codearr);
    }
  }

  code = clear(codeArr) as string;
  
  // 获取验证码过期时间
  const localTime = LocalTime();
  const CodeLastTime: string = (localTime + 59000).toString();
  const CodeExpiration: string = (localTime + 300000).toString();
  // 存储验证码
  try{
    const {acknowledged, modifiedCount} = await UserModel.updateOne({
      username: codeRequestData.username,
      password: codeRequestData.password
    },{
      $set: {
        code,
        CodeLastTime,
        CodeExpiration
      }
    });
    if(!(acknowledged || modifiedCount)) return res.send({data: null, meta: {status: 201, msg: 'verify code error'}});
  }catch(error){
    FormatLog('ERROR', codeRequestData.username, <string>error);
    return res.send({data: null, meta: {status: 201, msg: '存储验证码部分报错'}});
  }
  FormatLog('INFO', codeRequestData.username, `验证码: ${code}`);
  // 发送验证码
  // try {
  //   const EmailError = await sendEmail(dbUserData![0].email, code);
  //   if(EmailError) return res.send({data: null, meta: {status: 201, msg: 'verify code error'}});
  // } catch (error) {
  //   console.log(error);
  //   console.error('发送验证码部分报错');
  // }

  return res.send({data: code, meta: {status: 200, msg: '验证码发送成功'}});
});

// 推出登陆接口
LoginRouter.get('/outlogin', async (req: Request, res: Response)=>{
  const token:string | undefined = req.headers.authorization;
  const {_id} = verifyToken(token as string);
  const nowTime = LocalTime().toString();
  try{
    const {acknowledged, modifiedCount} = await UserModel.updateOne({_id},{
      $set: {
        code: nowTime,
        CodeLastTime: ''
      }
    });
    if(acknowledged && modifiedCount === 1) return res.send({data: null, meta: {status: 200, msg: '退出登陆成功'}});
  }catch(error){
    return res.send({data: null, meta: {status: 200, msg: '清除下次发送验证码时间限制失败'}});
  }
})

export default LoginRouter;