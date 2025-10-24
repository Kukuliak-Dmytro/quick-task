import { authClient } from "@/shared/lib/db/auth-client";

export const signIn = async (email: string, password: string) => {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL: "/",
    rememberMe: true,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signUp = async (name: string, email: string, password: string) => {
  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
    callbackURL: "/",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signOut = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
