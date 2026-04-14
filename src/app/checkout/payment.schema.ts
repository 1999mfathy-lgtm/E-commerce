import * as zod from "zod";

export const paymentSchema = zod.object({
  details: zod
    .string()
    .min(5, "Address too short")
    .max(100, "Address too long")
    .regex(/^[a-zA-Z0-9\s,.-]+$/, "Invalid address format"),

  city: zod
    .string()
    .min(2, "City is required")
    .regex(/^[a-zA-Z\s]+$/, "Invalid city name"),

  phone: zod
    .string()
    .min(1, "Enter Your Phone")
    .regex(/^(?:\+20|0)?1[0125][0-9]{8}$/, "Invalid phone"),
    type: zod.enum(["cash", "visa"]),
});

export type paymentFormData = zod.infer<typeof paymentSchema>;