import { TranslationTypes } from "@little-sentinel/shared/dist";
import { ValidationArguments } from "class-validator";
import _ from "lodash";

import { TS } from "../libs/translation.helper";
import { TypeHelper } from "../libs/type.helper";
import { IValidationTranslation } from "../types/validation.types";

interface IEnum { [key: number]: string | number }

export const tsDefaultDecorator = (context: TranslationTypes, key: string): IValidationTranslation => {
  return { message: ({ property }: ValidationArguments): string => TS.translate(context, key, { field: _.capitalize(property) }) };
};


export const tsEnumDecorator = (context: TranslationTypes, key: string, types: IEnum): IValidationTranslation => {
  return { message: ({ property }: ValidationArguments): string => TS.translate(context, key, { field: _.capitalize(property), types: TypeHelper.enumToStringArray(types).join(", ") }) };
};
