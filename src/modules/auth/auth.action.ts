"use server";

import { redirect } from "next/navigation";
import { auth } from "@/shared/lib/db/auth";
import { signInSchema, signUpSchema } from "./auth.interface";
import { headers } from "next/headers";

/**
 * Server action result type for authentication operations.
 *
 * @interface IAuthActionResult
 */
export interface IAuthActionResult {
  success: boolean;
  error?: string;
}

/**
 * Sign in server action with email and password.
 *
 * This server action authenticates a user using their email and password credentials.
 * On successful authentication, it redirects to the home page. On failure, it returns
 * an error message that can be displayed to the user. The nextCookies plugin automatically
 * handles setting the session cookie.
 *
 * @param _prevState - Previous state from useActionState (unused)
 * @param formData - FormData containing email and password
 * @returns Promise that resolves to authentication result
 */
export async function signInAction(
  _prevState: IAuthActionResult,
  formData: FormData,
): Promise<IAuthActionResult> {
  try {
    // Extract and validate form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    const validatedFields = signInSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid email or password format",
      };
    }

    // Attempt sign in using Better Auth server API
    await auth.api.signInEmail({
      body: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        rememberMe: true,
      },
    });

    // Success - redirect will happen after this returns
  } catch (err: unknown) {
    return {
      success: false,
      error: (err as Error).message || "Authentication failed",
    };
  }

  // Redirect on success (this must be outside try-catch as redirect throws)
  redirect("/");
}

/**
 * Sign up server action for new user registration.
 *
 * This server action creates a new user account with the provided credentials.
 * On successful registration, it redirects to the home page. On failure, it returns
 * an error message that can be displayed to the user. The nextCookies plugin automatically
 * handles setting the session cookie.
 *
 * @param _prevState - Previous state from useActionState (unused)
 * @param formData - FormData containing name, email, and password
 * @returns Promise that resolves to registration result
 */
export async function signUpAction(
  _prevState: IAuthActionResult,
  formData: FormData,
): Promise<IAuthActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    const validatedFields = signUpSchema.safeParse({ name, email, password });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid input. Please check your details.",
      };
    }

    // Attempt sign up using Better Auth server API
    await auth.api.signUpEmail({
      body: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      },
    });

    // Success - redirect will happen after this returns
  } catch (err: unknown) {
    return {
      success: false,
      error: (err as Error).message || "Registration failed",
    };
  }

  // Redirect on success (this must be outside try-catch as redirect throws)
  redirect("/");
}

/**
 * Sign out server action.
 *
 * This server action terminates the current user session and clears authentication
 * state. After signing out, it redirects the user to the login page.
 *
 * @returns Promise that resolves when sign out is complete
 */
export async function signOutAction(): Promise<void> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (err: unknown) {
    // Log error but still redirect
    console.error("Sign out error:", err);
  }

  // Redirect to login page
  redirect("/login");
}
