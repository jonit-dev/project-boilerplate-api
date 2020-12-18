import { Document, Model } from "mongoose";






export class CRUD {

  public async create<T>(Model: Model<Document, T>, props: Object): Promise<Document> {

    const newRecord = new Model({
      ...props
    });

    await newRecord.save();

    return newRecord;

  }


}
