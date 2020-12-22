import { InstitutionTypes } from "@little-sentinel/shared";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { tsDefaultDecorator, tsEnumDecorator } from "../../constants/validation.constants";

export class InstitutionCreateDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  name: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  email: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  supervisor: string;


  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsEnum(InstitutionTypes, tsEnumDecorator("validation", "isEnum", InstitutionTypes))
  type: InstitutionTypes;

  @IsString(tsDefaultDecorator("validation", "isString"))
  address: string;

  @IsString(tsDefaultDecorator("validation", "isString"))
  phone: string;
}


export class InstitutionUpdateDTO {

  @IsString(tsDefaultDecorator("validation", "isString"))
  name: string;

  @IsString(tsDefaultDecorator("validation", "isString"))
  email: string;

  @IsString(tsDefaultDecorator("validation", "isString"))
  supervisor: string;

  @IsEnum(InstitutionTypes)
  type: InstitutionTypes;

  @IsString(tsDefaultDecorator("validation", "isString"))
  address: string;

  @IsString(tsDefaultDecorator("validation", "isString"))
  phone: string;
}
