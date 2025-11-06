import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomeModule } from "@/app/modules/home";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";
import {
  configureServerSideGrowthBook,
  getFeatureValue,
} from "@/pkg/integrations/growthbook";

interface IProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Home page component.
 *
 * This page provides a simple landing page with a link to the posts page
 * and displays the GrowthBook feature flag value.
 *
 * @returns JSX element representing the home page
 */
export default async function Home(props: IProps) {
  const { locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Configure GrowthBook
  configureServerSideGrowthBook();

  // Get feature flag value (same as my-heroui-app)
  const listViewType = await getFeatureValue<string>(
    "flag_recipe_list_view_optimization_v2",
    "pagination",
    {},
  );

  // Debug: Log the feature flag value
  console.log("[GrowthBook] Feature flag value:", {
    key: "flag_recipe_list_view_optimization_v2",
    value: listViewType,
    defaultValue: "pagination",
  });

  return (
    <PageContainer>
      <HomeModule listViewType={listViewType} />
    </PageContainer>
  );
}
