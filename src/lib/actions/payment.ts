"use server";

import { connectToDatabase } from "../database/connection/mongoose";
import BillingModel from "../database/models/billing.model";
import Stripe from "stripe";
import { errorResponse } from "../utils";
import PaymentModel, { IPayment } from "../database/models/payment.model";
import { PRODUCTS } from "../constants";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY!);

export async function generateStripeCheckoutUrl(
  billingId: string,
  products: IProductInput[]
) {
  await connectToDatabase();

  // NOTE: Check if the billingId is valid
  const billing = await BillingModel.findById(billingId);

  if (!billing) {
    errorResponse("Billing ID is invalid", 400);
  }

  const computeSubTotal = () => {
    let total = 0;
    for (const product of products) {
      const selectedProduct = PRODUCTS.find((prod) => prod.id === product.id);
      total += Number(product.qty) * Number(selectedProduct!.price);
    }
    return total;
  };

  const metaData = {
    appProducts: JSON.stringify(products),
    userBilling: JSON.stringify(billing),
  };

  const amountToCharge = computeSubTotal() * 100;

  const payment = await PaymentModel.create({
    billingId,
    status: "NOT_PAID",
    metaData: {
      ...metaData,
    },
  } as IPayment);

  const paymentLink = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    line_items: [
      {
        price_data: {
          unit_amount: amountToCharge,
          currency: "usd",
          product_data: {
            name: "FURNITURE_PURCHASE",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      paymentId: payment?._id?.toString(),
    },
    success_url: "http://localhost:3000/stripe/success",
    cancel_url: "http://localhost:3000/stripe/cancel",
  });

  return {
    url: paymentLink?.url,
  };
}

// NOTE: https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local [Stripe Webhook]
// NOTE: https://docs.stripe.com/stripe-cli [Stripe CLI]
export async function processStripeWehookEvent(request: Request) {
  try {
    const signature = headers().get("stripe-signature");
    const webhookSecret = process.env.WEBHOOK_SECRET!;
    const body = await request.text();

    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      webhookSecret
    );

    // NOTE: Checkout event only
    if (event.type === "checkout.session.completed") {
      const sessionMetaData = event?.data?.object?.metadata;

      const paymentId = sessionMetaData?.paymentId;

      if (paymentId) {
        // NOTE: Update payment info
        await PaymentModel.updateOne(
          {
            _id: paymentId,
          },
          {
            status: "PAID",
          }
        );

        // TODO: Send the user an email of successful payment
      } else {
        throw new Error("Error processing checkout");
      }
    }
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 400 });
  }
}
