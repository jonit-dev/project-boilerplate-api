import { controller, httpGet, httpPatch, httpPost, interfaces, requestBody, requestParam } from "inversify-express-utils";

import { InternalServerError } from "../../errors/InternalServerError";
import { TS } from "../../libs/translation.helper";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { DTOValidatorMiddleware } from "../../middlewares/validator.middleware";
import { InstitutionCreateDTO, InstitutionUpdateDTO } from "./institution.dto";
import { IInstitution } from "./institution.model";
import { InstitutionService } from "./institution.service";

@controller("/institutions", AuthMiddleware)
export class InstitutionController implements interfaces.Controller {
  constructor(
    private institutionService: InstitutionService
  ) { }

  @httpPost("/", DTOValidatorMiddleware(InstitutionCreateDTO))
  private async create(@requestBody() institutionCreateDTO): Promise<IInstitution> {

    return this.institutionService.create(institutionCreateDTO);

  }

  @httpGet("/:id")
  private async read(@requestParam("id") id: string): Promise<IInstitution> {

    if (!id) {
      throw new InternalServerError(TS.translate("validation", "isNotEmpty", { field: "Id" }));
    }

    return this.institutionService.read(id);
  }

  @httpPatch("/:id", DTOValidatorMiddleware(InstitutionUpdateDTO))
  private async update(
    @requestBody() updateFields,
    @requestParam("id") id: string): Promise<IInstitution> {

    if (!id) {
      throw new InternalServerError(TS.translate("validation", "isNotEmpty", { field: "Id" }));
    }

    return this.institutionService.update(id, updateFields);


  }

}

