import { IsDefined, IsNotEmpty, IsString, MaxLength, MinLength, ValidationArguments } from "class-validator";

import { TS } from "../../libs/translation.helper";

export class AuthSignUpDTO {
  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  @MinLength(4, { message: ({ property }: ValidationArguments) => TS.translate("validation", "minLength", { field: property }) })
  @MaxLength(50, { message: ({ property }: ValidationArguments) => TS.translate("validation", "maxLength", { field: property }) })
  name: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  @MinLength(8, { message: ({ property }: ValidationArguments) => TS.translate("validation", "minLength", { field: property }) })
  @MaxLength(50, { message: ({ property }: ValidationArguments) => TS.translate("validation", "maxLength", { field: property }) })
  email: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  @MinLength(3, { message: ({ property }: ValidationArguments) => TS.translate("validation", "minLength", { field: property }) })
  @MaxLength(50, { message: ({ property }: ValidationArguments) => TS.translate("validation", "maxLength", { field: property }) })
  password: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  @MinLength(3, { message: ({ property }: ValidationArguments) => TS.translate("validation", "minLength", { field: property }) })
  @MaxLength(500, { message: ({ property }: ValidationArguments) => TS.translate("validation", "maxLength", { field: property }) })
  address: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  @MinLength(3, { message: ({ property }: ValidationArguments) => TS.translate("validation", "minLength", { field: property }) })
  @MaxLength(500, { message: ({ property }: ValidationArguments) => TS.translate("validation", "maxLength", { field: property }) })
  phone: string;

}

export class AuthLoginDTO {
  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  email: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  password: string;
}

export class AuthRefreshTokenDTO {
  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  refreshToken: string;
}
