import { authClient } from "@/pkg/libraries/better-auth/auth-client";

/**
 * Signs in a user with email and password.
 *
 * This function authenticates a user using their email and password credentials.
 * It includes automatic redirection to the home page and remember me functionality.
 *
 * @param email - User's email address
 * @param password - User's password
 * @param locale - User's locale for locale-aware redirects
 * @returns Promise that resolves to authentication data
 * @throws {Error} Throws an error if authentication fails
 */
export const signIn = async (
  email: string,
  password: string,
  locale?: string,
) => {
  const callbackURL = locale && locale !== "en" ? `/${locale}` : "/";

  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL,
    rememberMe: true,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Signs up a new user with name, email, and password.
 *
 * This function creates a new user account with the provided credentials.
 * It includes automatic redirection to the home page after successful registration.
 *
 * @param name - User's full name
 * @param email - User's email address
 * @param password - User's password
 * @param locale - User's locale for locale-aware redirects
 * @returns Promise that resolves to registration data
 * @throws {Error} Throws an error if registration fails
 */
export const signUp = async (
  name: string,
  email: string,
  password: string,
  locale?: string,
) => {
  const callbackURL = locale && locale !== "en" ? `/${locale}` : "/";

  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
    callbackURL,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Signs out the current user.
 *
 * This function terminates the current user session and clears authentication
 * state. It should be called when the user wants to log out of the application.
 *
 * @returns Promise that resolves when sign out is complete
 * @throws {Error} Throws an error if sign out fails
 */
export const signOut = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
