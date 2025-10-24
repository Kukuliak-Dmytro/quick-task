import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8).max(100),
});

export type ISignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type ISignInSchema = z.infer<typeof signInSchema>;
