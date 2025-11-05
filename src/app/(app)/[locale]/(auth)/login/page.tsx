import { use } from "react";
import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LoginModule } from "@/app/modules/auth";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";

export const revalidate = 30;

interface IProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Login page component.
 *
 * This page provides the user interface for user authentication, including
 * the login module and page title. It's designed to be simple and focused
 * on the authentication process.
 *
 * @returns JSX element representing the login page
 */
const LoginPage = (props: IProps) => {
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
        <LoginModule />
      </div>
    </PageContainer>
  );
};

export default LoginPage;
