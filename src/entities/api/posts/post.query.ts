import { infiniteQueryOptions } from "@tanstack/react-query";
import { getPosts } from "./post.api";

/**
 * Query key constants for posts-related queries.
 *
 * @constant POST_QUERY_KEYS
 */
export const POST_QUERY_KEYS = {
  /** Query key for posts infinite query */
  posts: () => ["posts"] as const,
} as const;

/**
 * Infinite query options for fetching posts with pagination.
 *
 * This function creates infinite query options for React Query to fetch posts
 * from the database with pagination support. Each page contains 5 posts by default.
 *
 * @returns React Query infinite query options object with pagination support
 */
export const postsInfiniteQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: POST_QUERY_KEYS.posts(),
    queryFn: async ({ pageParam = 1 }) => {
      return await getPosts({ page: pageParam, limit: 5 });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};
