"use server";

import { connectToDatabase } from "../database/connection/mongoose";
import BillingModel, { IBilling } from "../database/models/billing.model";

export async function createBillingInfo(input: IBilling) {
  await connectToDatabase();
  const billing = await BillingModel.create(input);
  return billing;
}

export async function updateBillingInfo(input: IBilling, billingId: string) {
  await connectToDatabase();
  await BillingModel.updateOne(
    {
      _id: billingId,
    },
    input
  );
  const billing = await BillingModel.findById(billingId);
  return billing;
}
