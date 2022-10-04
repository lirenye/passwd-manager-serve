import UserModel, { UserDocument } from "./models/user.model"
import logger from "./utils/logger";

(async function(){
  const UserDocument: UserDocument = {
    username: 'lirenye',
    password: '123456'
  }
  try {
    const user = new UserModel(UserDocument);
    await user.validate();
    logger.info('通过验证')
  } catch (error) {
    logger.error(error)
    logger.error('验证失败');
  }
})()