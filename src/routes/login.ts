import { Router, Request, Response} from 'express'
import UserModel from '../models/user.model';
import { signToken, verifyToken } from '../utils/jwt';
import sendEmail from '../utils/email'
import LocalTime from '../utils/time';

const UserRouter = Router()

UserRouter.post('/login',async (req: Request, res: Response)=>{
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
  const data = await UserModel.find(req.body);
  // 查询无结果
  if(!(data.length)) return res.send({data: null, meta: {
    status: 201,
    msg: '密码账号或验证码错误'
  }});

  // get token
  const {_id, username} = data[0]
  const token = signToken({_id, username});
  return res.send({data:{token}, meta: {status: 200, msg: '登陆成功'}});
});


// 验证码接口
interface UserInfo {
  username: string,
  password: string,
  code?: string
};
interface DBUserInfo {
  _id: string,
  username: string,
  password: string,
  email: string,
  code: string
  CodeLastTime: string,
}
UserRouter.post("/code", async (req: Request, res: Response)=>{
  // 获取用户信息
  const userInfo: UserInfo = req.body;
  delete userInfo['code'];
  // 验证用户信息
  let  dbUserData: Array<DBUserInfo>;
  try{
    dbUserData= await UserModel.find(userInfo);
    if(!dbUserData.length) return res.send({data:null, meta: {status: 201, msg: '请检查账户信息'}});
  }catch(error){
    console.log(error);
    console.error('验证用户信息部分报错');
  };


  // 验证过期时间
  const NowCodeLastTime = LocalTime().toString();
  console.log(new Date(Number(NowCodeLastTime)));
  console.log(new Date(Number(dbUserData![0].CodeLastTime)));
  if(dbUserData![0].CodeLastTime && dbUserData![0].CodeLastTime >= NowCodeLastTime) {
    return res.send({data: null, meta: {status: 201, msg: '请稍后重试'}});
  };

  // 获取验证码
  const random = Math.random()
  console.log(random);
  let code: string = Math.floor(random * 1000000).toString();
  // 获取验证码过期时间
  const localTime = LocalTime();
  const CodeLastTime: string = (localTime + 59000).toString();
  const CodeExpiration: string = (localTime + 300000).toString();
  // 存储验证码
  try{
    const {acknowledged, modifiedCount} = await UserModel.updateOne(userInfo,{
      $set: {
        code,
        CodeLastTime,
        CodeExpiration
      }
    });
    console.log(code);
    if(!(acknowledged || modifiedCount)) return res.send({data: null, meta: {status: 201, msg: 'verify code error'}});
  }catch(error){
    console.log(error);
    console.error('存储验证码部分报错');
  }
  // 发送验证码
  try {
    const EmailError = await sendEmail(dbUserData![0].email, code);
    if(EmailError) return res.send({data: null, meta: {status: 201, msg: 'verify code error'}});
  } catch (error) {
    console.log(error);
    console.error('发送验证码部分报错');
  }

  return res.send({data: code, meta: {status: 200, msg: '验证码发送成功'}});
});

UserRouter.get('/outlogin', async (req: Request, res: Response)=>{
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

export default UserRouter;