import { Express } from "express";
import express from 'express';
import cors from 'cors'
import { parseToken} from './preparse'

function initMiddleware(app: Express) {
  app.use(express.static('public'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(parseToken);
};

export default initMiddleware;