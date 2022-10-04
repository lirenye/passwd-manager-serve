import { Express } from "express";
import express from 'express'

function initMiddleware(app: Express) {
  app.use(express.json());
};

export default initMiddleware;