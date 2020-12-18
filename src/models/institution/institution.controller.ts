import { Response } from "express";
import { controller, httpPost, interfaces, requestBody } from "inversify-express-utils";

import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { DTOValidatorMiddleware } from "../../middlewares/validator.middleware";
import { IRequestCustom } from "../../types/express.types";
import { InstitutionCreateDTO } from "./institution.dto";
import { IInstitution } from "./institution.model";
import { InstitutionService } from "./institution.service";

@controller("/institutions", AuthMiddleware)
export class InstitutionController implements interfaces.Controller {
  constructor(
    private institutionService: InstitutionService
  ) { }

  @httpPost("/", DTOValidatorMiddleware(InstitutionCreateDTO))
  private async create(@requestBody() institutionCreateDTO, req: IRequestCustom, res: Response): Promise<IInstitution> {
    return this.institutionService.create(institutionCreateDTO);
  }
}

