"use client";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { useActionState } from "react";
import { signUpAction } from "../auth.action";

/**
 * RegisterForm component for user registration.
 *
 * This component provides a form for new users to create an account with their name,
 * email, and password. It uses Next.js server actions with native HTML form validation
 * for progressive enhancement. The form works without JavaScript and automatically
 * redirects users after successful registration.
 *
 * @returns JSX element representing the registration form
 */
export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(signUpAction, {
    success: true,
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          required
          minLength={1}
          disabled={isPending}
        />
      </Field>

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
          maxLength={100}
          required
          disabled={isPending}
        />
      </Field>

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};
