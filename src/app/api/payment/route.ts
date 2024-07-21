import { generateStripeCheckoutUrl } from "@/lib/actions/payment";
import { PRODUCTS } from "@/lib/constants";
import { errorResponse, successResponse } from "@/lib/utils";
import { PaymentInputValidation } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputValidation = PaymentInputValidation.safeParse(body);

    if (!inputValidation.success) {
      return errorResponse(
        "Input validation failed",
        400,
        inputValidation.error
      );
    }

    let products: IProductInput[] = [];

    for (const singleProduct of body.products as IProductInput[]) {
      const productId = singleProduct!.id;
      const product = PRODUCTS.find((product) => product.id === productId);
      if (product) {
        products.push({
          qty: singleProduct!.qty,
          id: productId,
        });
      } else {
        return errorResponse(
          `Invalid productId ${productId}`,
          400,
          inputValidation.error
        );
      }
    }

    const checkoutLink = await generateStripeCheckoutUrl(
      body.billingId,
      products
    );

    return successResponse(
      checkoutLink,
      "Checkout link generated successfully",
      200
    );
  } catch (err) {
    return errorResponse((err as any)?.message, 400);
  }
}
