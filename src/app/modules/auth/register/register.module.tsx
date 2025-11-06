"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
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

//component
/**
 * RegisterModule component for user registration.
 */
export const RegisterModule = () => {
  const t = useTranslations();
  const locale = useLocale();
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
      await signUp(data.name, data.email, data.password, locale);
    } catch (err: unknown) {
      setError((err as Error).message || t("auth_register_error"));
    } finally {
      setIsLoading(false);
    }
  };

  //return
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">
        {t("auth_register_title")}
      </h1>
      <Field>
        <FieldLabel htmlFor="name">{t("auth_register_label_name")}</FieldLabel>
        <Input
          {...register("name")}
          id="name"
          type="text"
          placeholder={t("auth_register_placeholder_name")}
        />
        <FieldError errors={errors.name ? [errors.name] : []} />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">
          {t("auth_register_label_email")}
        </FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder={t("auth_register_placeholder_email")}
        />
        <FieldError errors={errors.email ? [errors.email] : []} />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">
          {t("auth_register_label_password")}
        </FieldLabel>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder={t("auth_register_placeholder_password")}
        />
        <FieldError errors={errors.password ? [errors.password] : []} />
      </Field>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={isLoading}>
        {isLoading
          ? t("auth_register_button_loading")
          : t("auth_register_button")}
      </Button>
    </form>
  );
};
