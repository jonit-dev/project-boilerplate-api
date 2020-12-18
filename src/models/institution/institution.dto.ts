import { IsDefined, IsEnum, IsNotEmpty, IsString, ValidationArguments } from "class-validator";

import { TS } from "../../libs/translation.helper";
import { InstitutionTypes } from "./institution.types";




export class InstitutionCreateDTO {
  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  name: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  email: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  supervisor: string;

  @IsDefined({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsNotEmpty({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isNotEmpty", { field: property }) })
  @IsEnum(InstitutionTypes)
  type: InstitutionTypes;

  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  address: string;

  @IsString({ message: ({ property }: ValidationArguments) => TS.translate("validation", "isString", { field: property }) })
  phone: string;
}
