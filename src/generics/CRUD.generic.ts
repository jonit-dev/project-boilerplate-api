import { injectable } from "inversify";
import { Document, Model } from "mongoose";

import { ConflictError } from "../errors/ConflictError";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";

@injectable()
export class CRUD {

  public async create<T extends Document>(Model: Model<T>, props: Object): Promise<T> {

    try {
      const newRecord = new Model({
        ...props
      });

      await newRecord.save();

      return newRecord;
    } catch (error) {
      console.error(error);

      if (error.message.includes("duplicate key")) {
        throw new ConflictError(`Error: ${Model.modelName} already exists!`);
      }

      throw new InternalServerError(`Error while trying to create a new ${Model.modelName}: ${error.message}`);
    }
  }

  public async read<T extends Document>(Model: Model<T>, filters): Promise<T> {

    try {

      if (filters._id) {
        if (!filters._id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new InternalServerError(`Invalid id for ${Model.modelName}.`);
        }
      }


      // @ts-ignore
      const record = await Model.findOne(filters
      );

      if (!record) {
        throw new NotFoundError(`${Model.modelName} not found.`);
      }

      return record;
    } catch (error) {
      console.error(error);

      throw new InternalServerError(`Error: ${error.message}`);

    }
  }
}
