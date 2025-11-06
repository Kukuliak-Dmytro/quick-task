"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { ISignInSchema, signInSchema } from "../auth.interface";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/app/shared/components/ui/field";
import { useState } from "react";
import { signIn } from "../auth.service";

//component
/**
 * LoginModule component for user authentication.
 */
export const LoginModule = () => {
  const t = useTranslations();
  const locale = useLocale();
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
      await signIn(data.email, data.password, locale);
    } catch (err: unknown) {
      setError((err as Error).message || t("auth_login_error"));
    } finally {
      setIsLoading(false);
    }
  };

  //return
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* new field component */}
      <h1 className="text-3xl font-bold text-center">
        {t("auth_login_title")}
      </h1>
      <Field>
        <FieldLabel htmlFor="email">{t("auth_login_label_email")}</FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder={t("auth_login_placeholder_email")}
        />
        {/* allows to display multiple errors in the same field */}
        {/* convert to an array  */}
        <FieldError errors={errors.email ? [errors.email] : []} />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">
          {t("auth_login_label_password")}
        </FieldLabel>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder={t("auth_login_placeholder_password")}
        />
        <FieldError errors={errors.password ? [errors.password] : []} />
      </Field>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? t("auth_login_button_loading") : t("auth_login_button")}
      </Button>
    </form>
  );
};
