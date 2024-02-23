import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string({ required_error: "Password is required" }).min(3, {
    message: "Password must be at least 3 characters",
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
