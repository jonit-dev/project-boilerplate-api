import { injectable } from "inversify";

import { Environment, IEnvironment } from "./environment.model";
import { EnvironmentRepository } from "./environment.repository";



@injectable()
export class EnvironmentService {

  constructor(
    private environmentRepository: EnvironmentRepository
  ) { }

  public async create(data): Promise<IEnvironment> {
    return this.environmentRepository.create<IEnvironment>(Environment, data, ["caregiver", "institution"]);
  }

  public async read(id: string): Promise<IEnvironment> {
    return this.environmentRepository.read<IEnvironment>(Environment, { _id: id }, ["caregiver", "institution"]);
  }

  public async update(id: string, updateFields): Promise<IEnvironment> {
    return this.environmentRepository.update<IEnvironment>(Environment, id, updateFields, ["caregiver", "institution"]);
  }

  public async delete(id: string): Promise<void> {
    return this.environmentRepository.delete<IEnvironment>(Environment, id);
  }

}
