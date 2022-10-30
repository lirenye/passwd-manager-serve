import { Express, Request, Response} from 'express'
import LoginRouter from './login'
import AccountRouter from './account'
import UserRouter from './user'


function routes(app: Express) {
  app.get('/', (req: Request, res: Response)=>{
    res.send('server ok')
  })
  app.use('/', LoginRouter);
  app.use('/account', AccountRouter);
  app.use('/user', UserRouter);
};

export default routes;