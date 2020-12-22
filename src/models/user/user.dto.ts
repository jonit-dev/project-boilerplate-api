import { IsDefined, IsNotEmpty, IsString } from "class-validator";

import { translateDecorator } from "../../constants/validation.constants";



export class UserForgotPasswordDTO {
  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  email: string;
}
