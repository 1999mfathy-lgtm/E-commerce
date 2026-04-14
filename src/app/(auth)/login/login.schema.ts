import * as zod from "zod";

export const loginSchema = zod
  .object({
    email: zod .string() .min(1, "Enter Your Email") .email("invalid email"),
    password: zod .string() .min(1, "Create a Strong Password").regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "wrong password" ),
 });
 
export type loginFormData = zod.infer<typeof loginSchema>;