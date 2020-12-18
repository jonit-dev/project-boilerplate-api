import { injectable } from "inversify";

import { NotFoundError } from "../../errors/NotFoundError";
import { TS } from "../../libs/translation.helper";
import { IUser, User } from "./user.model";

@injectable()
export class UserRepository {

  constructor() { }

  public async findUser(params: object): Promise<IUser> {

    const user = await User.findOne(params);

    if (!user) {
      throw new NotFoundError(TS.translate("users", "userNotFound"));
    }

    return user;


  }


}
