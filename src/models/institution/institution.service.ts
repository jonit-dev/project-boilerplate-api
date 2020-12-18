import { injectable } from "inversify";

import { IInstitution, Institution } from "./institution.model";
import { InstitutionRepository } from "./institution.repository";



@injectable()
export class InstitutionService {

  constructor(
    private institutionRepository: InstitutionRepository
  ) { }

  public async create(data): Promise<IInstitution> {

    const newInstitution = await this.institutionRepository.create(Institution, data) as IInstitution;

    return newInstitution;
  }

}
