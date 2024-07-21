import { processStripeWehookEvent } from "@/lib/actions/payment";
import { errorResponse, successResponse } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await processStripeWehookEvent(request);
    return successResponse({}, "Success", 200);
  } catch (err) {
    return errorResponse((err as any)?.message, 500);
  }
}
