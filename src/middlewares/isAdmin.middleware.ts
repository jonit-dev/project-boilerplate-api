import { UserTypes } from "@project-boilerplate/shared";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TS } from "../libs/translation.helper";
import { IUser } from "../models/user/user.model";
import { IRequestCustom } from "../types/express.types";



export const isAdminMiddleware = (req: IRequestCustom, res, next): void => {

  const user = req.user as IUser;

  if (user.role !== UserTypes.Admin) {
    throw new UnauthorizedError(TS.translate("auth", "adminOnlyResource"));
  } else {
    next();
  }


};
