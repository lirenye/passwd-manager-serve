import { Express } from "express";
import express from 'express'

function initMiddleware(app: Express) {
  app.use(express.json());
  app.use(express.urlencoded())
};

export default initMiddleware;