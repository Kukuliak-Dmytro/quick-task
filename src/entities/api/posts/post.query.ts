import { queryOptions } from "@tanstack/react-query";
import { getPosts } from "./post.api";

// Query key constants
export const POST_QUERY_KEYS = {
  posts: () => ["posts"] as const,
} as const;

/**
 * Query options for fetching all posts.
 *
 * This function creates query options for React Query to fetch all posts
 * from the database.
 *
 * @returns React Query options object
 */
export const postsQueryOptions = () => {
  return queryOptions({
    queryKey: POST_QUERY_KEYS.posts(),
    queryFn: async () => {
      return await getPosts();
    },
  });
};
