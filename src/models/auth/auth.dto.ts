import { IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

import { translateDecorator } from "../../constants/validation.constants";

export class AuthSignUpDTO {
  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  @MaxLength(50, translateDecorator("validation", "maxLength"))
  name: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  @MinLength(3, translateDecorator("validation", "minLength"))
  @MaxLength(50, translateDecorator("validation", "maxLength"))
  email: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  @MinLength(3, translateDecorator("validation", "minLength"))
  @MaxLength(50, translateDecorator("validation", "maxLength"))
  password: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  @MinLength(3, translateDecorator("validation", "minLength"))
  @MaxLength(500, translateDecorator("validation", "maxLength"))
  address: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  @MinLength(3, translateDecorator("validation", "minLength"))
  @MaxLength(500, translateDecorator("validation", "maxLength"))
  phone: string;

}

export class AuthLoginDTO {
  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  email: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  password: string;
}

export class AuthRefreshTokenDTO {
  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  refreshToken: string;
}
