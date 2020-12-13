import { inject, injectable } from "inversify";

import { BadRequestError } from "../../errors/BadRequestError";
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

  public async forgotPassword(email: string): Promise<boolean> {

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError(TS.translate("users", "userNotFound"));
    }


    console.log(email);


    // try to get user with mentioned e-mail


    // if it succeed, generate a new password and send it back to the user.


    return true;

  }


}
