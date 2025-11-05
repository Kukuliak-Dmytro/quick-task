import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import { postsInfiniteQueryOptions } from "@/app/entities/api";
import { PostList } from "./elements/post-list.component";

/**
 * PostsSection feature component.
 *
 * Server component: prefetch posts and hydrate on client.
 * This feature brings together all post-related elements:
 * - Post list with infinite scroll
 * - Post cards
 * - Post details
 * - Create post functionality
 *
 * @returns Promise that resolves to JSX element representing the posts section
 */
export const PostsSection = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
};
