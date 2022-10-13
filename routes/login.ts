import { Router, Request, Response} from 'express'
import UserModel from '../models/user.model';
import { signToken } from '../utils/jwt';

const UserRouter = Router()

UserRouter.post('/login',async (req: Request, res: Response)=>{
  // 请求数据检测
  try {
    await new UserModel(req.body).validate()
  } catch (err) {
    return res.send({data: err, meta: {
      status: 201,
      msg: '参数未通过检查'
    }});
  }

  // 获取用户信息
  // const data = await UserModel.create(req.body);
  const data = await UserModel.find(req.body);
  // 查询无结果
  if(!(data.length)) return res.send({data: null, meta: {
    status: 201,
    msg: '账号或密码错误'
  }});

  // get token
  const {_id, username, password} = data[0]
  const token = signToken({_id, username, password});
  return res.send({data:{token}, meta: {status: 200, msg: '登陆成功'}});
});

export default UserRouter;