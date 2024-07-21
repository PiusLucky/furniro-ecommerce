import { Schema, model, models } from "mongoose";

export interface IPayment {
  _id: string;
  billingId: string;
  status: "NOT_PAID" | "PAID";
  metaData: object;
}

const PaymentSchema = new Schema(
  {
    billingId: {
      type: Schema.Types.String,
      ref: "BillingModel",
      required: true,
    }, // Reference to Billing model
    status: { type: String, enum: ["NOT_PAID", "PAID"], required: true },
    metaData: { type: Object, required: true },
  },
  { timestamps: true } // This will add the createdAt and updatedAt fields
);

const PaymentModel =
  models?.PaymentModel || model("PaymentModel", PaymentSchema);

export default PaymentModel;
