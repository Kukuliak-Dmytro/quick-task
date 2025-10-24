"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignInSchema, signInSchema } from "../auth.interface";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { useState } from "react";
import { signIn } from "../auth.service";

/**
 * LoginForm component for user authentication.
 *
 * This component provides a form for users to sign in with their email and password.
 * It includes form validation using React Hook Form and Zod, error handling, and loading states.
 * The form automatically redirects users after successful authentication.
 *
 * @returns JSX element representing the login form
 */
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: ISignInSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn(data.email, data.password);
    } catch (err: unknown) {
      setError((err as Error).message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* new field component */}
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email"
        />
        {/* allows to display multiple errors in the same field */}
        {/* convert to an array  */}
        <FieldError errors={errors.email ? [errors.email] : []} />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
        />
        <FieldError errors={errors.password ? [errors.password] : []} />
      </Field>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
