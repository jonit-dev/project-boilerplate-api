import { Request } from "express";

import { IUser } from "../models/user/user.model";

export interface IRequestCustom extends Request {
  body: {
    [key: string]: string | undefined;
  };
  user?: IUser;
}

export interface IServerBootstrapVars {
  appName: string;
  timezone: string;
  adminEmail: string;
  language: string;
  phoneLocale: string;
  port: string | number;
}
