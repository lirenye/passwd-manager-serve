import mongoose from "mongoose";
import logger from "./logger";
import { mongoConf, dbURI} from '../config'

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