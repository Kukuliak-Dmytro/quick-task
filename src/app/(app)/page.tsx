import { HomeModule } from "@/app/modules/home";

import { PageContainer } from "@/app/shared/components/page-container";

/**
 * Home page component.
 *
 * This page provides a simple landing page with a link to the posts page.
 *
 * @returns JSX element representing the home page
 */
export default function Home() {
  return (
    <PageContainer>
      <HomeModule />
    </PageContainer>
  );
}
