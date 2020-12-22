import { EnvironmentTypes, InstitutionGrades } from "@little-sentinel/shared";
import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

import { TypeHelper } from "../../libs/type.helper";

const environmentSchema = createSchema(
  {
    name: Type.string({
      required: true,
      unique: true,
    }),
    type: Type.string({
      required: true,
      enum: TypeHelper.enumToStringArray(EnvironmentTypes)
    }),
    caregiver: Type.objectId({
      required: true,
      ref: "User"
    }),
    institution: Type.objectId({
      required: true,
      ref: "Institution"
    }),
    grade: Type.string({
      required: true,
      enum: TypeHelper.enumToStringArray(InstitutionGrades)
    })
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);


export type IEnvironment = ExtractDoc<typeof environmentSchema>;

export const Environment = typedModel("Environment", environmentSchema);
