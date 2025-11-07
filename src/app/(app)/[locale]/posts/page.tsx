import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PostsModule } from "@/app/modules/posts";
import { PageContainer } from "@/app/shared/components/page-container";
import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import {
  postsInfiniteQueryOptions,
  postsQueryOptions,
} from "@/app/entities/api";
import { routing } from "@/pkg/libraries/locale/routing";
import { getFeatureValue } from "@/pkg/integrations/growthbook";
import { configureServerSideGrowthBook } from "@/pkg/integrations/growthbook";
import { PAGINATION_LIMIT } from "@/app/features/pagination/pagination.constants";

export const revalidate = 30;

//interface
interface IProps {
  params: Promise<{ locale: Locale }>;
}

//component
/**
 * PostsPage component.
 */
export const PostsPage = async (props: IProps) => {
  const { locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  const queryClient = getQueryClient();

  // Configure GrowthBook for server-side evaluation
  configureServerSideGrowthBook();

  // Evaluate feature flag using the correct flag key from GrowthBook dashboard
  const listViewType = await getFeatureValue<string>(
    "flag_recipe_list_view_optimization_v2",
    "pagination",
    {},
  );

  // Prefetch based on variant
  if (listViewType === "infinite") {
    // Prefetch first page for infinite scroll
    await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());
  } else if (listViewType === "pagination") {
    // Prefetch first page for paginated variant
    await queryClient.prefetchQuery(
      postsQueryOptions({ page: 1, limit: PAGINATION_LIMIT }),
    );
  }

  //return
  return (
    <PageContainer>
      <PostsModule listViewType={listViewType} />
    </PageContainer>
  );
};

export default PostsPage;
