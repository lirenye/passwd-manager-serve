import { Express, Request, Response} from 'express'
import UserRouter from './login'


function routes(app: Express) {
  app.get('/', (req: Request, res: Response)=>{
    res.send('server ok')
  })
  app.use('/', UserRouter);
};

export default routes;