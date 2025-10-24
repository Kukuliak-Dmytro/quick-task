import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/utils/get-query-client";
import { postsQueryOptions } from "@/entities/api";
import { PostList } from "@/widgets/posts";

/**
 * Main posts page component with server-side data fetching.
 *
 * This component handles server-side data prefetching and renders the posts page
 * with full functionality. It orchestrates the PostList widget and provides
 * hydration boundary for optimal performance.
 *
 * @returns The posts page component
 */
export const PostsPageComponent = async () => {
  const queryClient = getQueryClient();

  // Prefetch posts data on the server
  await queryClient.prefetchQuery(postsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
};

export default PostsPageComponent;
