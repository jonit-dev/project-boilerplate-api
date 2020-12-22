import { ValidationArguments } from "class-validator";

export interface IValidationTranslation {
  message: ({ property }: ValidationArguments) => string
}
