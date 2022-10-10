import { Express } from "express";
import express from 'express';
import cors from 'cors'

function initMiddleware(app: Express) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded())
};

export default initMiddleware;