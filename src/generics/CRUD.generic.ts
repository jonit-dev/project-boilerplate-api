import { injectable } from "inversify";
import { Document, Model } from "mongoose";





@injectable()
export class CRUD {

  public async create<T>(Model: Model<Document, T>, props: Object): Promise<Document> {

    const newRecord = new Model({
      ...props
    });

    await newRecord.save();

    return newRecord;
  }


}
