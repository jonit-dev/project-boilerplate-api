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
import { EnvironmentCreateDTO, EnvironmentUpdateDTO } from "./environment.dto";
import { IEnvironment } from "./environment.model";
import { EnvironmentService } from "./environment.service";


@controller("/environments", AuthMiddleware)
export class EnvironmentController implements interfaces.Controller {
  constructor(
    private environmentService: EnvironmentService
  ) { }

  @httpPost("/", DTOValidatorMiddleware(EnvironmentCreateDTO))
  private async create(@requestBody() createData): Promise<IEnvironment> {
    return this.environmentService.create(createData);
  }

  @httpGet("/:id")
  private async read(@requestParam("id") id: string): Promise<IEnvironment> {
    return this.environmentService.read(id);
  }

  @httpPatch("/:id", DTOValidatorMiddleware(EnvironmentUpdateDTO))
  private async update(
    @requestBody() updateFields,
    @requestParam("id") id: string): Promise<IEnvironment> {
    return this.environmentService.update(id, updateFields);
  }

  @httpDelete("/:id")
  private async delete(
    @requestParam("id") id: string,
    @response() res,
  ): Promise<any> {

    await this.environmentService.delete(id);

    return res.status(HttpStatus.OK).send();
  }

}

