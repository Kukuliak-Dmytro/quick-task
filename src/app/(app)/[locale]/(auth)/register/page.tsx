import { use } from "react";
import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { RegisterModule } from "@/app/modules/auth";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";

export const revalidate = 30;

interface IProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Register page component.
 *
 * This page provides the user interface for user registration, including
 * the registration module and page title. It's designed to be simple and focused
 * on the account creation process.
 *
 * @returns JSX element representing the register page
 */
const RegisterPage = (props: IProps) => {
  const { locale } = use(props.params);

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <PageContainer>
      <div className="mx-auto max-w-md space-y-6">
        <RegisterModule />
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
