import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomeModule } from "@/app/modules/home";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";
import { getFeatureValue } from "@/pkg/integrations/growthbook";

//interface
interface IProps {
  params: Promise<{ locale: Locale }>;
}
export const revalidate = 30;
//component
/**
 * Home page component.
 */
export const Home = async (props: IProps) => {
  const { locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const listViewType = await getFeatureValue<string>(
    "flag_recipe_list_view_optimization_v2",
    "pagination",
    {},
  );

  //return
  return (
    <PageContainer>
      <HomeModule listViewType={listViewType} />
    </PageContainer>
  );
};

export default Home;
