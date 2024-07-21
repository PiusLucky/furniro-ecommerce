import * as z from "zod";

export const BillingInfoInputValidation = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  company: z.string(),
  country: z.string().min(1, "Country required field"),
  street: z.string().min(3, "Street required field"),
  town: z.string().min(3, "Town required field"),
  province: z.string().min(3, "Province required field"),
  zipCode: z.string().min(3, "Zip code required field"),
  phone: z
    .string()
    .min(7, {
      message: "Phone required field",
    })
    .max(20, {
      message: "Zip code required field",
    }),
  email: z.string().email(),
  additionalInfo: z.string(),
});

export const PaymentInputValidation = z.object({
  billingId: z.string().min(2, {
    message: "billingId  ",
  }),
  products: z.array(
    z.object({
      id: z.string().min(1, {
        message: "Product ID is required",
      }),
      qty: z.number().min(1, {
        message: "Product Qty is required",
      }),
    })
  ),
});
