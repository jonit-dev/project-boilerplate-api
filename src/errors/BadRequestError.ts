import { HttpStatus } from "@project-boilerplate/shared";

import { ApplicationError } from "./ApplicationError";

export class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatus.BadRequest);

    this.error = BadRequestError.name;
  }
}
