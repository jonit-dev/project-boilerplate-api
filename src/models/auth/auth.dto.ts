import { IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

import { tsDefaultDecorator } from "../../constants/validation.constants";

export class AuthSignUpDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  @MaxLength(50, tsDefaultDecorator("validation", "maxLength"))
  name: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  @MinLength(3, tsDefaultDecorator("validation", "minLength"))
  @MaxLength(50, tsDefaultDecorator("validation", "maxLength"))
  email: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  @MinLength(3, tsDefaultDecorator("validation", "minLength"))
  @MaxLength(50, tsDefaultDecorator("validation", "maxLength"))
  password: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  passwordConfirmation: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  @MinLength(3, tsDefaultDecorator("validation", "minLength"))
  @MaxLength(500, tsDefaultDecorator("validation", "maxLength"))
  address: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  @MinLength(3, tsDefaultDecorator("validation", "minLength"))
  @MaxLength(500, tsDefaultDecorator("validation", "maxLength"))
  phone: string;

}

export class AuthLoginDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  email: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  password: string;
}

export class AuthRefreshTokenDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  refreshToken: string;
}

export class AuthForgotPasswordDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  email: string;
}

export class AuthChangePasswordDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  currentPassword: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  newPassword: string;
}
