import mongoose from "mongoose";
import { UserDocument, UserSchema} from "./models/user.model";
import {AccountSchema} from './models/account.model'
import { mongoConf, dbURI } from "./config";

(async function () {
  // 连接数据库
  const connection = mongoose.createConnection(dbURI, mongoConf);
  const user =  connection.model('user', UserSchema);
  const accout = connection.model('account', AccountSchema)

  // 创建新用户
  // await createUser({username: '', password: ''});
  
  // 验证用户信息
  // await validUser({username: 'qwqwqwqw',password: '123456'})
  // console.log(new user({
  //   username: 'lirenye',
  //   password: '123456',
  //   email: '2694613297@qq.com',
  //   code: '123456',
  //   CodeLastTime: '1234623423'
  // }).validateSync())
  // 查看所有用户信息
  console.log(await user.find());

  // 修改用户信息
  // console.log(await user.updateOne({username: 'lirenye'},{$set: {
  //   email: '2694613297@qq.com',
  //   code: '123456',
  //   CodeLastTime: '1234123'
  // }}))

  // 查看账户信息
  // console.log(await accout.find({
  //   author: '63416bbc6fbecdd7704ffd5c',
  //   platform: {
  //     "$regex": /test4/
  //   }
  // }));

  // 修改账户信息
  // console.log(await accout.updateOne(
  //   {_id: "63481675122914f8439945bf"},
  //   {$set: {
  //     password: '222277'
  //   }}
  // ))

  // 删除账户信息
  // console.log(await accout.deleteOne({platform: 'test5'}));

  const date = new Date();
  // 获取当前时间
  const localTime: number = (date.getTime() + 28800000);
  const localDate = new Date(localTime);
  console.log(localDate);

  // 验证码
  // const math = Math.random() * 10
  // console.log(Math.floor(math));
  // console.log(Math.ceil(math))

  async function createUser(userInfo:UserDocument) {
    try {
      new user(userInfo).validateSync();
      console.log('新用户信息验证通过');
      const userData = await user.create(userInfo);
      console.log(userData)
      console.log('新用户创建成功');
    } catch (error) {
      console.error(error);
      console.error('新用户创建失败');
    }
  };

  async function validUser(userInfo:UserDocument) {
    try{
      await new user(userInfo).validate();
      console.log('验证通过')
    }catch(error){
      console.error(error);
      console.error('验证失败')
    }
  }

  // close db
  await connection.close()
  console.log('关闭连接中')
})()

// createUer({username: 'lirenye', password: '123456'});

// async function createUer(userInfo: UserDocument) {
//   const createData = await UserModel.create(userInfo);
//   console.log(createData);
// }