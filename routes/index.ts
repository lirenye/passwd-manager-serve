import { Express, Request, Response} from 'express'
import UserRouter from './login'
import AccountRouter from './account'


function routes(app: Express) {
  app.get('/', (req: Request, res: Response)=>{
    res.send('server ok')
  })
  app.use('/', UserRouter);
  app.use('/account', AccountRouter);
};

export default routes;