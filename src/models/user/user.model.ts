import { UserAuthFlow, UserTypes } from "@little-sentinel/shared";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

import { appEnv } from "../../config/env";
import { InternalServerError } from "../../errors/InternalServerError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TS } from "../../libs/translation.helper";
import { TypeHelper } from "../../libs/type.helper";
import { IAuthResponse } from "../auth/auth.types";

const mongooseHidden = require("mongoose-hidden")();

const userSchema = createSchema(
  {
    name: Type.string(),
    role: Type.string({
      required: true,
      default: UserTypes.Regular,
      enum: TypeHelper.enumToStringArray(UserTypes),
    }),
    authFlow: Type.string({
      required: true,
      default: UserAuthFlow.Basic,
      enum: TypeHelper.enumToStringArray(UserAuthFlow),
    }),
    email: Type.string({ required: true, unique: true }),
    password: Type.string(),
    address: Type.string(),
    phone: Type.string(),
    salt: Type.string(),
    unsubscribed: Type.boolean({ default: false }),
    refreshTokens: Type.array().of({
      token: Type.string(),
    }),

    // Static method types
    ...({} as {
      isValidPassword: (password: string) => Promise<boolean>;
      generateAccessToken: () => Promise<IAuthResponse>;
    }),
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type IUser = ExtractDoc<typeof userSchema>;

//  Hidden fields (not exposed through API responses)
userSchema.plugin(mongooseHidden, {
  hidden: {
    password: true,
    salt: true,
    refreshTokens: true,
    createdAt: true,
    updatedAt: true,
  },
});




// Hooks ========================================

userSchema.pre("save", async function (next): Promise<void> {
  const user = this as IUser;
  const salt = await bcrypt.genSalt();

  if (user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    user.salt = salt;
    next();
  }
});
userSchema.methods.isValidPassword = async function (
  providedPassword: string
): Promise<boolean> {
  const comparisonHash = await bcrypt.hash(providedPassword, this.salt);

  return comparisonHash === this.password;
};

userSchema.methods.generateAccessToken = async function (): Promise<
  IAuthResponse
> {
  const user = this as IUser;

  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    appEnv.authentication.JWT_SECRET!,
    // { expiresIn: "20m" }
  );
  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email },
    appEnv.authentication.REFRESH_TOKEN_SECRET!
  );

  user.refreshTokens = [...user.refreshTokens!, { token: refreshToken }];

  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};


export const User = typedModel("User", userSchema, undefined, undefined, {
  // Static methods ========================================
  checkIfExists: async (email: string): Promise<boolean> => {
    const exists = await User.findOne({ email });

    if (exists) {
      return true;
    }

    return false;
  },
  findByCredentials: async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError(TS.translate("users", "userNotFound"));
    }

    // check if user was created using Basic UserAuthFlow (this route is only for this!)

    if (user.authFlow !== UserAuthFlow.Basic) {
      throw new InternalServerError(TS.translate("auth", "authModeError"));
    }


    const isValidPassword = await user.isValidPassword(password);

    if (isValidPassword) {
      return user;
    }

    return false;
  },
});
