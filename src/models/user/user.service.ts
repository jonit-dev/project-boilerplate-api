import { UserAuthFlow } from "@little-sentinel/shared/dist";
import randomString from "crypto-random-string";
import { inject, injectable } from "inversify";

import { appEnv } from "../../config/env";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TS } from "../../libs/translation.helper";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService {

  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) { }

  public async unsubscribeUser(email: string): Promise<void> {

    const user = await this.userRepository.findUser({ email });

    if (user.unsubscribed === true) {
      throw new BadRequestError(TS.translate("users", "userAlreadyUnsubscribed"));
    }

    user.unsubscribed = true;
    await user.save();
  }

  public async forgotPassword(email: string): Promise<string> {

    const user = await User.findOne({ email });



    if (!user) {
      throw new NotFoundError(TS.translate("users", "userNotFound"));
    }

    if (user.authFlow !== UserAuthFlow.Basic) {
      throw new InternalServerError(TS.translate("auth", "authModeError"));
    }


    const randomPassword = randomString({ length: 10 });

    console.log(`generated random password of ${randomPassword}`);

    user.password = randomPassword;
    await user.save();

    if (randomPassword) {
      return randomPassword;
    } else {
      throw new InternalServerError(`Error while trying to generate your new password. Please, contact the server admin at ${appEnv.general.ADMIN_EMAIL}`);
    }




    // try to get user with mentioned e-mail


    // if it succeed, generate a new password and send it back to the user.


  }


}
