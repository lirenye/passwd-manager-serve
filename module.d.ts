import { Request, Response } from "express";

export interface Req extends Request {
  token: any;
};