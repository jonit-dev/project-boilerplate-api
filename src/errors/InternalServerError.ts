import { HttpStatus } from "@little-sentinel/shared";

import { ApplicationError } from "./ApplicationError";

export class InternalServerError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatus.InternalServerError);

    this.error = InternalServerError.name;
  }
}
