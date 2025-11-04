"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUpSchema, signUpSchema } from "../auth.interface";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/app/shared/components/ui/field";
import { useState } from "react";
import { signUp } from "../auth.service";

/**
 * RegisterForm component for user registration.
 *
 * This component provides a form for new users to create an account with their name,
 * email, and password. It includes form validation using React Hook Form and Zod,
 * error handling, and loading states. The form automatically redirects users after
 * successful registration.
 *
 * @returns JSX element representing the registration form
 */
export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: ISignUpSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await signUp(data.name, data.email, data.password);
    } catch (err: unknown) {
      setError((err as Error).message || "Register failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input {...register("name")} id="name" type="text" placeholder="Name" />
        <FieldError errors={errors.name ? [errors.name] : []} />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email"
        />
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
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};
