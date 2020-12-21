import { injectable } from "inversify";
import { Document, Model, model } from "mongoose";

import { ConflictError } from "../errors/ConflictError";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { TS } from "../libs/translation.helper";


@injectable()
export class CRUD {

  private _isObjectIdValid(_id: string, modelName: string): boolean | Error {
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new InternalServerError(`Invalid id for ${modelName}.`);
    }

    return true;
  }

  public async create<T extends Document>(Model: Model<T>, props: Object, populateKeys?: string[]): Promise<T> {

    try {
      const newRecord = new Model({
        ...props
      });

      await newRecord.save();

      if (populateKeys) {

        for (const key of populateKeys) {
          await newRecord.populate(key).execPopulate();
        }
      }

      return newRecord;
    } catch (error) {
      console.error(error);

      if (error.message.includes("duplicate key")) {
        throw new ConflictError(TS.translate("validation", "alreadyExists", { field: Model.modelName }));
      }

      throw new InternalServerError(`${TS.translate("validation", "creationError", { field: Model.modelName })} ${error.message}`);
    }
  }

  public async read<T extends Document>(Model: Model<T>, filters, populateKeys?: string[]): Promise<T> {

    try {

      if (filters._id) {
        this._isObjectIdValid(filters._id, Model.modelName);
      }


      // @ts-ignore
      const record = await Model.findOne(filters);

      if (populateKeys) {
        for (const key of populateKeys) {
          await record?.populate(key).execPopulate();
        }
      }


      if (!record) {
        throw new NotFoundError(TS.translate("validation", "notFound", { field: Model.modelName }));
      }

      return record;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  public async update<T extends Document>(Model: Model<T>, id, updateFields): Promise<T> {

    this._isObjectIdValid(id, Model.modelName);

    try {
      const model = await Model.findById(id);

      if (!model) {
        throw new NotFoundError(TS.translate("validation", "notFound", { field: Model.modelName }));
      }

      for (const [key, value] of Object.entries(updateFields)) {
        model[key] = value;
      }

      await model.save();

      return model;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async delete<T extends Document>(Model: Model<T>, id): Promise<void> {

    this._isObjectIdValid(id, Model.modelName);

    try {
      const model = await Model.findOneAndDelete({
        _id: id
      });

      if (!model) {
        throw new NotFoundError(TS.translate("validation", "notFound", { field: Model.modelName }));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
