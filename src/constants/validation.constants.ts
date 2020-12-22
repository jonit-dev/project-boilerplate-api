import { TranslationTypes } from "@little-sentinel/shared/dist";
import { ValidationArguments } from "class-validator";

import { TS } from "../libs/translation.helper";
import { IValidationTranslation } from "../types/validation.types";



export const translateDecorator = (context: TranslationTypes, key: string): IValidationTranslation => {
  return { message: ({ property }: ValidationArguments): string => TS.translate(context, key, { field: property }) };
}
  ;


