import express from 'express'
import { Response } from 'express';
import { port } from './config';
import logger from './utils/logger'
import dbConnect from './utils/dbConnect';
import routes from './routes';
import initMiddleware from './middleware';

const app = express();
initMiddleware(app);


app.listen(port, async ()=>{
  await dbConnect();
  routes(app);
  logger.info(`server start at http://localhost:${port}`)
})