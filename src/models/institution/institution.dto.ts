import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { translateDecorator } from "../../constants/validation.constants";
import { InstitutionTypes } from "./institution.types";

export class InstitutionCreateDTO {
  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  name: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  email: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsString(translateDecorator("validation", "isString"))
  supervisor: string;

  @IsDefined(translateDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(translateDecorator("validation", "isNotEmpty"))
  @IsEnum(InstitutionTypes)
  type: InstitutionTypes;

  @IsString(translateDecorator("validation", "isString"))
  address: string;

  @IsString(translateDecorator("validation", "isString"))
  phone: string;
}


export class InstitutionUpdateDTO {

  @IsString(translateDecorator("validation", "isString"))
  name: string;

  @IsString(translateDecorator("validation", "isString"))
  email: string;

  @IsString(translateDecorator("validation", "isString"))
  supervisor: string;

  @IsEnum(InstitutionTypes)
  type: InstitutionTypes;

  @IsString(translateDecorator("validation", "isString"))
  address: string;

  @IsString(translateDecorator("validation", "isString"))
  phone: string;
}
