import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomeModule } from "@/app/modules/home";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";

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

  //return
  return (
    <PageContainer>
      <HomeModule />
    </PageContainer>
  );
};

export default Home;
