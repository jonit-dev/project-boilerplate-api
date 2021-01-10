import { HttpStatus } from "@project-boilerplate/shared";

import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatus.NotFound);

    this.error = NotFoundError.name;
  }
}
