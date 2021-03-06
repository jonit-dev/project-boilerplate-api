import { Request, Response } from "express";
import fs from "fs";
import { controller, httpGet, interfaces, queryParam } from "inversify-express-utils";

import { staticPath } from "../../constants/path.constants";
import { BadRequestError } from "../../errors/BadRequestError";
import { EncryptionHelper } from "../../libs/encryption.helper";
import { TS } from "../../libs/translation.helper";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { IRequestCustom } from "../../types/express.types";
import { IUser } from "./user.model";
import { UserService } from "./user.service";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(
    private userService: UserService,
    private encryptionHelper: EncryptionHelper
  ) { }

  @httpGet("/self", AuthMiddleware)
  private async ownInfo(req: IRequestCustom, res: Response): Promise<IUser> {

    const user = req.user;

    if (!user) {
      throw new BadRequestError(TS.translate("users", "userNotFound"));
    }

    return user;
  }

  @httpGet("/unsubscribe")
  private async unsubscribeUser(@queryParam("hashEmail") hashEmail: string, req: Request, res: Response): Promise<string | Response<any>> {

    if (!hashEmail) {
      return res.status(500).send({
        status: "error",
        message: TS.translate("error", "noHashEmail")
      });
    }
    const email = this.encryptionHelper.decrypt(String(hashEmail));

    try {
      // lets try unsubscribing this user
      await this.userService.unsubscribeUser(email);

      // I decided for readFileSync because sendFile does not work with inversify-js: https://github.com/inversify/InversifyJS/issues/1045
      const html = fs.readFileSync(`${staticPath}/unsubscribe.html`, "utf8");

      return res.send(html);
    } catch (error) {
      console.error(error);
      throw error;
    }



  }
}

