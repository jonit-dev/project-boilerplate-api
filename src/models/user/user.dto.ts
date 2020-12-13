import { IsDefined, IsNotEmpty, IsString, ValidationArguments } from "class-validator";

import { TS } from "../../libs/translation.helper";



export class UserForgotPasswordDTO {
  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  email: string;
}
