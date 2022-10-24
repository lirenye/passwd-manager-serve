import express from 'express'
import { port } from './config';
import dbConnect from './utils/dbConnect';
import routes from './routes';
import initMiddleware from './middleware';
import logger from './utils/logger';
import {verifyMailer} from  "./utils/email"


const app = express();
initMiddleware(app);

// global.logger = 'sdfsf's


app.listen(port, async ()=>{
  await dbConnect();
  await verifyMailer();
  routes(app);
  // console.log(`server start at http://localhost:${port}`)
  logger.info(`server start at http://localhost:${port}`)
  // console.log(logger)
})