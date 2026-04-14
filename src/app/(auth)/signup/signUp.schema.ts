import * as zod from "zod";

export const signUpSchema = zod
  .object({
    name: zod .string().min(3, "Name must be at least 3 chars"),
    email: zod .string() .min(1, "Enter Your Email") .email("Enter valid email"),
    password: zod .string() .min(1, "Create a Strong Password").regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number & 1 special character" ),
    rePassword: zod.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "rePassword not match" ),
   phone: zod .string() .min(1, "Enter Your Phone") .regex(/^(?:\+20|0)?1[0125][0-9]{8}$/, "Invalid phone"),})
  .refine((data) => data.password === data.rePassword, { message: "Passwords do not match", path: ["rePassword"], });
 
 export type SignUpFormData = zod.infer<typeof signUpSchema>;