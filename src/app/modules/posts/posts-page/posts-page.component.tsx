import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/shared/lib/utils/get-query-client";
import { postsInfiniteQueryOptions } from "@/app/entities/api";
import { PostList } from "@/app/widgets/posts";

/**
 * Main posts page component with server-side data fetching.
 *
 * This component handles server-side data prefetching and renders the posts page
 * with full functionality. It orchestrates the PostList widget and provides
 * hydration boundary for optimal performance with infinite query support.
 *
 * @returns Promise that resolves to JSX element representing the posts page
 */
export const PostsPageComponent = async () => {
  const queryClient = getQueryClient();

  // Prefetch the first page of posts data on the server
  await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
};

export default PostsPageComponent;
