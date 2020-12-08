import { HttpStatus } from "@little-sentinel/shared";

import { ApplicationError } from "./ApplicationError";

export class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatus.BadRequest);

    this.error = BadRequestError.name;
  }
}
