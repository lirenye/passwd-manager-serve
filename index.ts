import express from 'express'
import { port } from './config';
import logger from './utils/logger'
import dbConnect from './utils/dbConnect';
import initMiddleware from './middleware';

const app = express();
initMiddleware(app);


app.listen(port, async ()=>{
  await dbConnect();
  logger.info(`server start at http://localhost:${port}`)
})