import mongoose from "mongoose";
import { UserDocument, UserSchema} from "./models/user.model";
import { mongoConf, dbURI } from "./config";
import logger from './utils/logger'

(async function () {
  // 连接数据库
  const connection = mongoose.createConnection(dbURI, mongoConf);
  const user =  connection.model('user', UserSchema);

  // 创建新用户
  // await createUser({username: '', password: ''});
  
  // 验证用户信息
  await validUser({username: 'qwqwqwqw',password: '123456'})
  // 查看所有账户信息
  // logger.info(await user.find());

  async function createUser(userInfo:UserDocument) {
    try {
      new user(userInfo).validateSync();
      logger.info('新用户信息验证通过');
      const userData = await user.create(userInfo);
      logger.info(userData)
      logger.info('新用户创建成功');
    } catch (error) {
      logger.error(error);
      logger.error('新用户创建失败');
    }
  };

  async function validUser(userInfo:UserDocument) {
    try{
      await new user(userInfo).validate();
      logger.info('验证通过')
    }catch(error){
      logger.error(error);
      logger.error('验证失败')
    }
  }

  // close db
  await connection.close()
  logger.info('关闭连接中')
})()

// createUer({username: 'lirenye', password: '123456'});

// async function createUer(userInfo: UserDocument) {
//   const createData = await UserModel.create(userInfo);
//   logger.info(createData);
// }