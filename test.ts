import UserModel, { UserDocument } from "./models/user.model"
import AccountModel from "./models/account.model";
import logger from "./utils/logger";

// 数据库初始化
// init()

// 创建新用户
// createUser({username: 'test', password: '123456'})

finds();

async function finds() {
  const data = await UserModel.findOne({username: 'lirenye'});
  logger.info(data);
}

async function init() {
  try {
    UserModel.createCollection();
    logger.info('用户集合创建完毕');
    AccountModel.createCollection();
    logger.info('账户集合创建完毕')
  } catch (error) {
    logger.error(error);
    logger.error('初始化失败');
  }
}

async function createUser(userInfo: UserDocument){
  try {
    const user = new UserModel(userInfo);
    await user.validate();
    logger.info('通过验证')
    await user.save();
    logger.info('保存成功')
    logger.info(UserModel.db)
  } catch (error) {
    logger.error(error)
    logger.error('验证失败');
  }
}