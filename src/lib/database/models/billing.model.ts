import { Schema, model, models } from "mongoose";

export interface IBilling {
  _id: string;
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street: string;
  town: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

const BillingSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } // This will add the createdAt and updatedAt fields
);

const BillingModel =
  models?.BillingModel || model("BillingModel", BillingSchema);

export default BillingModel;
