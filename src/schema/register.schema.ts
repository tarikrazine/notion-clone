import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string({ required_error: "Confirm password is required" })
    .min(6, {
      message: "Confirm password must be at least 6 characters",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
