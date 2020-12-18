import { injectable } from "inversify";

import { IInstitution, Institution } from "./institution.model";
import { InstitutionRepository } from "./institution.repository";



@injectable()
export class InstitutionService {

  constructor(
    private institutionRepository: InstitutionRepository
  ) { }

  public async create(data): Promise<IInstitution> {
    return this.institutionRepository.create<IInstitution>(Institution, data);
  }

  public async read(id: string): Promise<IInstitution> {
    return this.institutionRepository.read<IInstitution>(Institution, { _id: id });
  }

}
