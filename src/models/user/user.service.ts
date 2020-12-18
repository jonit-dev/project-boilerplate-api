import { UserAuthFlow } from "@little-sentinel/shared/dist";
import randomString from "crypto-random-string";
import { injectable } from "inversify";

import { TransactionalEmail } from "../../../emails/TransactionalEmail";
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
    private userRepository: UserRepository
  ) { }

  public async unsubscribeUser(email: string): Promise<void> {

    const user = await this.userRepository.findUser({ email });

    if (user.unsubscribed === true) {
      throw new BadRequestError(TS.translate("users", "userAlreadyUnsubscribed"));
    }

    user.unsubscribed = true;
    await user.save();
  }

  public async forgotPassword(email: string): Promise<boolean> {

    // try to get user with mentioned e-mail
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError(TS.translate("users", "userNotFound"));
    }

    if (user.authFlow !== UserAuthFlow.Basic) {
      throw new InternalServerError(TS.translate("auth", "authModeError"));
    }


    // if it succeed, generate a new password and send it back to the user.
    const randomPassword = randomString({ length: 10 });

    console.log(`generated random password of ${randomPassword}`);

    user.password = randomPassword;
    await user.save();

    // send e-mail to user with the new password content
    await TransactionalEmail.send(user.email, TS.translate("email", "passwordRecoveryGreetings"), "notification", {
      notificationGreetings: TS.translate("email", "passwordRecoveryGreetings"),
      notificationMessage: TS.translate("email", "passwordRecoveryMessage", { randomPassword }),
      notificationEndPhrase: TS.translate("email", "passwordRecoveryEndPhrase")
    });


    if (randomPassword) {
      return true;
    } else {
      throw new InternalServerError(`Error while trying to generate your new password. Please, contact the server admin at ${appEnv.general.ADMIN_EMAIL}`);
    }



  }


}
