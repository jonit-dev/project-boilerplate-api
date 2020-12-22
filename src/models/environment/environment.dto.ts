import { EnvironmentTypes, InstitutionGrades, InstitutionTypes } from "@little-sentinel/shared";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { tsDefaultDecorator, tsEnumDecorator } from "../../constants/validation.constants";

export class EnvironmentCreateDTO {
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsString(tsDefaultDecorator("validation", "isString"))
  name: string;



  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsEnum(EnvironmentTypes, tsEnumDecorator("validation", "isEnum", EnvironmentTypes))
  type: InstitutionTypes;

  @IsString(tsDefaultDecorator("validation", "isString"))
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  caregiver: string;

  @IsString(tsDefaultDecorator("validation", "isString"))
  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  institution: string;

  @IsDefined(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsNotEmpty(tsDefaultDecorator("validation", "isNotEmpty"))
  @IsEnum(InstitutionGrades, tsEnumDecorator("validation", "isEnum", InstitutionGrades))
  grade: InstitutionTypes;
}


export class EnvironmentUpdateDTO {
  @IsString(tsDefaultDecorator("validation", "isString"))
  name: string;

  @IsEnum(EnvironmentTypes, tsEnumDecorator("validation", "isEnum", EnvironmentTypes))
  type: InstitutionTypes;

  @IsString(tsDefaultDecorator("validation", "isString"))
  caregiver: string;

  @IsString(tsDefaultDecorator("validation", "isString"))
  institution: string;

  @IsEnum(InstitutionGrades, tsEnumDecorator("validation", "isEnum", InstitutionGrades))
  grade: InstitutionTypes;
}
