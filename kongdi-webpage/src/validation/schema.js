import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(4, "first name is required"),
    lastName: z.string().trim().min(4, "last name is required"),
    email: z.string().trim().email({ message: "email format is not correct" }),
    profileImage: z.any().optional(),
    username: z.string().trim().min(6, "Username is required"),
    password: z
      .string()
      .min(6, "Password need to be at least 6 characters")
      .trim()
      .regex(/[A-Z]/, {
        message: "Password must contain at least one Upper",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one Number",
      }),
    confirmPassword: z.string().trim().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().trim().min(6, "Username is required"),
  password: z
    .string()
    .min(6, "Password need to be at least 6 characters")
    .trim()
    .regex(/[A-Z]/, {
      message: "Password must contain at least one Upper",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one Number",
    }),
});
