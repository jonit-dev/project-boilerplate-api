import { HttpStatus } from "@little-sentinel/shared/dist";
import { Response } from "express";
import { controller, httpPost, interfaces } from "inversify-express-utils";

import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { IRequestCustom } from "../../types/express.types";
import { InstitutionService } from "./institution.service";

@controller("/institutions", AuthMiddleware)
export class InstitutionController implements interfaces.Controller {
  constructor(
    private institutionService: InstitutionService
  ) { }

  @httpPost("/")
  private async create(req: IRequestCustom, res: Response): Promise<Response<void>> {

    this.institutionService.sayHi();

    return res.status(HttpStatus.OK).send();

  }





}

