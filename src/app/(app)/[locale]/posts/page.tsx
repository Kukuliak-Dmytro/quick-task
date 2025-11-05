import { PostsModule } from "@/app/modules/posts";

import { PageContainer } from "@/app/shared/components/page-container";
import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { postsInfiniteQueryOptions } from "@/app/entities/api";
export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());
  return (
    <PageContainer>
      <PostsModule />
    </PageContainer>
  );
}
