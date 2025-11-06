import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PostsModule } from "@/app/modules/posts";
import { PageContainer } from "@/app/shared/components/page-container";
import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { postsInfiniteQueryOptions } from "@/app/entities/api";
import { routing } from "@/pkg/libraries/locale/routing";

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

  await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());

  //return
  return (
    <PageContainer>
      <PostsModule />
    </PageContainer>
  );
};

export default PostsPage;
