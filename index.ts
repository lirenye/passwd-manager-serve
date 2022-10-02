import express from 'express'
import { port } from './config';
const app = express();



app.listen(port, async ()=>{
  console.log(`server start at http://localhost:${port}`)
})