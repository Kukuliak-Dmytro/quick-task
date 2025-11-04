import { z } from "zod";

/**
 * Zod schema for user registration form validation.
 *
 * @constant signUpSchema
 */
export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8).max(100),
});

/**
 * TypeScript type for user registration form data.
 *
 * @type ISignUpSchema
 */
export type ISignUpSchema = z.infer<typeof signUpSchema>;

/**
 * Zod schema for user sign-in form validation.
 *
 * @constant signInSchema
 */
export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

/**
 * TypeScript type for user sign-in form data.
 *
 * @type ISignInSchema
 */
export type ISignInSchema = z.infer<typeof signInSchema>;
