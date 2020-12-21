import { injectable } from "inversify";

import { CRUD } from "../../generics/CRUD.generic";



@injectable()
export class InstitutionRepository extends CRUD {
  constructor() {
    super();
  }
}
