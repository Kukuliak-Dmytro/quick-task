import { z } from "zod";

//constant
/**
 * Zod schema for user registration form validation.
 */
export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8).max(100),
});

//interface
export interface ISignUpSchema {
  name: string;
  email: string;
  password: string;
}

//constant
/**
 * Zod schema for user sign-in form validation.
 */
export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

//interface
export interface ISignInSchema {
  email: string;
  password: string;
}
