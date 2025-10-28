"use client";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { useActionState } from "react";
import { signInAction } from "../auth.action";

/**
 * LoginForm component for user authentication.
 *
 * This component provides a form for users to sign in with their email and password.
 * It uses Next.js server actions with native HTML form validation for progressive
 * enhancement. The form works without JavaScript and automatically redirects users
 * after successful authentication.
 *
 * @returns JSX element representing the login form
 */
export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signInAction, {
    success: true,
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          disabled={isPending}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          minLength={8}
          required
          disabled={isPending}
        />
      </Field>

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
