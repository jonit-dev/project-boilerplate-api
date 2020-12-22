import { IsDefined, IsNotEmpty, IsString } from "class-validator";

import { tsDefaultDecorator } from "../../constants/validation.constants";



export class UserForgotPasswordDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  email: string;
}
