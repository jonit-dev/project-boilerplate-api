import { HttpStatus } from "@little-sentinel/shared/dist";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  interfaces,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";

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
    return this.institutionService.read(id);
  }

  @httpPatch("/:id", DTOValidatorMiddleware(InstitutionUpdateDTO))
  private async update(
    @requestBody() updateFields,
    @requestParam("id") id: string): Promise<IInstitution> {
    return this.institutionService.update(id, updateFields);
  }

  @httpDelete("/:id")
  private async delete(
    @requestParam("id") id: string,
    @response() res,
  ): Promise<any> {

    console.log(`deleting institution id ${id}`);
    await this.institutionService.delete(id);

    return res.status(HttpStatus.OK).send();
  }

}

