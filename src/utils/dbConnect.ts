import mongoose from "mongoose";
import { mongoConf, dbURI} from '../config'
import logger from './logger'

async function dbConnect() {
  try {
    const connection = await mongoose.connect(dbURI, mongoConf);
    logger.info('DB connected');

    return connection;
  } catch (error) {
    logger.error('Could not connect to db')
  }
};

export default dbConnect;