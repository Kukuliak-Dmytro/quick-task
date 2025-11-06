import { authClient } from "@/pkg/libraries/better-auth/auth-client";

//function
/**
 * Signs in a user with email and password.
 */
export const signIn = async (
  email: string,
  password: string,
  locale?: string,
) => {
  // Always include locale in callback URL to preserve locale context
  const callbackURL = locale ? `/${locale}` : "/";

  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL,
    rememberMe: true,
  });

  if (error) {
    throw new Error(error.message);
  }
  //return
  return data;
};

//function
/**
 * Signs up a new user with name, email, and password.
 */
export const signUp = async (
  name: string,
  email: string,
  password: string,
  locale?: string,
) => {
  // Always include locale in callback URL to preserve locale context
  const callbackURL = locale ? `/${locale}` : "/";

  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
    callbackURL,
  });

  if (error) {
    throw new Error(error.message);
  }

  //return
  return data;
};

//function
/**
 * Signs out the current user.
 */
export const signOut = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
