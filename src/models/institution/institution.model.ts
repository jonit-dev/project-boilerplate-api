import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

import { TypeHelper } from "../../libs/type.helper";
import { InstitutionTypes } from "./institution.types";

const institutionSchema = createSchema(
  {
    name: Type.string({
      required: true
    }),
    email: Type.string({
      required: true
    }),
    supervisor: Type.objectId({
      required: true
    }),
    type: {
      required: true,
      enum: TypeHelper.enumToStringArray(InstitutionTypes)
    },
    address: Type.string(),
    phone: Type.string()
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);


export type IInstitution = ExtractDoc<typeof institutionSchema>;

export const Institution = typedModel("Institution", institutionSchema);
