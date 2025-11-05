import { use } from "react";
import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomeModule } from "@/app/modules/home";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";

interface IProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Home page component.
 *
 * This page provides a simple landing page with a link to the posts page.
 *
 * @returns JSX element representing the home page
 */
export default function Home(props: IProps) {
  const { locale } = use(props.params);

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <PageContainer>
      <HomeModule />
    </PageContainer>
  );
}
