import { UserAuthFlow, UserTypes } from "@little-sentinel/shared";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

import { appEnv } from "../../config/env";
import { TypeHelper } from "../../libs/type.helper";
import { IAuthResponse } from "../auth/auth.types";

const mongooseHidden = require("mongoose-hidden")();

const userSchema = createSchema(
  {
    name: Type.string(),
    role: Type.string({
      required: true,
      default: UserTypes.Guardian,
      enum: TypeHelper.enumToStringArray(UserTypes),
    }),
    authFlow: Type.string({
      required: true,
      default: UserAuthFlow.Basic,
      enum: TypeHelper.enumToStringArray(UserAuthFlow),
    }),
    email: Type.string({ required: true }),
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
      hashAndSavePassword: (newPassword: string) => Promise<boolean>;
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

userSchema.pre("save", async function (next): Promise<void> {
  const user = this as IUser;

  if (user.isModified("password")) {
    await user.hashAndSavePassword(user.password!);
    next();
  }
});

userSchema.methods.isValidPassword = async function (
  providedPassword: string
): Promise<boolean> {
  const comparisonHash = await bcrypt.hash(providedPassword, this.salt);

  return comparisonHash === this.password;
};

userSchema.methods.hashAndSavePassword = async function (newPassword: string): Promise<boolean> {
  const user = this as IUser;
  const salt = await bcrypt.genSalt();

  try {
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    user.salt = salt;
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
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

    if (await user?.isValidPassword(password)) {
      return user;
    }

    return false;
  },
});
