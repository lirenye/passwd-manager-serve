import nodemailer from 'nodemailer'
import { emailConf} from '../config/index'
import logger from './logger';

const tranporter = nodemailer.createTransport(
  {
    host: emailConf.host,
    port: emailConf.port,
    secure: emailConf.secure,
    auth: {
      user: emailConf.user,
      pass: emailConf.pass
    }
  }
);

// verify connection
export async function verifyMailer(){
  const err = await new Promise((resolve: any, rejects: any)=>{
    tranporter.verify((err:Error|null)=>{
      if(err){
        // console.log(err)
        resolve(err)
      }else{
        resolve(null);
      }
    });
  });
  if(err) return logger.error('邮箱连接失败');
  else return logger.info('邮箱连接成功')
}

export default async function sendCode(toEmail: string, code: string){
  return new Promise((resolve, rejects)=>{
    if(!toEmail) return rejects('没有电子邮箱');
    if(!code) return rejects('没有验证码');
    tranporter.sendMail(
      {
        from: `"passwd-Manager"${emailConf.user}`,
        to: toEmail,
        subject: '验证码',
        text: 'text 文本测试',
        html: `<h1>验证码为：<span>${code}</span></h1>`
      },
      (err: Error| null)=>{
        resolve(err)
      }
    );
  })
}