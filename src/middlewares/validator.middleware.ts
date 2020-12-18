import { HttpStatus, IValidationError } from "@little-sentinel/shared";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";

import { BadRequestError } from "../errors/BadRequestError";


export const DTOValidatorMiddleware = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction): any {
    const output = plainToClass(dtoClass, req.body);

    validate(output, { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true }).then(
      (errors: IValidationError[]) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          const errorList: string[] = [];
          for (const validationError of errors) {
            console.log(validationError);

            const constraintsKv = Object.entries(
              validationError.constraints!
            ).map(([key, value]) => ({ key, value }));

            for (const item of constraintsKv) {
              errorList.push(_.capitalize(item.value));
            }
          }

          return res.status(HttpStatus.BadRequest).send(new BadRequestError(errorList));
        } else {
          res.locals.input = output;
          next();
        }
      }
    );
  };
};
