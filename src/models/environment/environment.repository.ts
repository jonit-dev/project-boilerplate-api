import { injectable } from "inversify";

import { CRUD } from "../../generics/CRUD.generic";



@injectable()
export class EnvironmentRepository extends CRUD {
  constructor() {
    super();
  }
}
