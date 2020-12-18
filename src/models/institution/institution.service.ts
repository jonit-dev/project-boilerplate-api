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

  public async update(id: string, updateFields): Promise<IInstitution> {
    return this.institutionRepository.update<IInstitution>(Institution, id, updateFields);
  }

}
