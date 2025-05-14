import { z } from "zod";
export const SignUpSchema = z.object({
  // sign up fields
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
