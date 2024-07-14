import { createBillingInfo, updateBillingInfo } from "@/lib/actions/billing";
import { errorResponse, successResponse } from "@/lib/utils";
import { BillingInfoInputValidation } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inputValidation = BillingInfoInputValidation.safeParse(body);

    if (!inputValidation.success) {
      return errorResponse(
        "Input validation failed",
        400,
        inputValidation.error
      );
    }

    const billing = await createBillingInfo(body);

    return successResponse(
      billing,
      "Billing information created successfully",
      201
    );
  } catch (err) {
    return errorResponse((err as any)?.message, 400);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const inputValidation = BillingInfoInputValidation.safeParse(body?.data);

    if (!inputValidation.success) {
      return errorResponse(
        "Input validation failed",
        400,
        inputValidation.error
      );
    }

    const billing = await updateBillingInfo(body?.data, body?.billingId);

    return successResponse(
      billing,
      "Billing information updated successfully",
      200
    );
  } catch (err) {
    return errorResponse((err as any)?.message, 400);
  }
}
