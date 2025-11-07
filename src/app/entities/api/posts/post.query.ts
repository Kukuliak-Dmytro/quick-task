import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { getPosts } from "./post.api";

//constant
export const POST_QUERY_KEYS = {
  postsBase: () => ["posts"] as const,
  posts: (page: number, limit: number) => ["posts", page, limit] as const,
  postsInfinite: () => ["posts-infinite"] as const,
} as const;

//function
/**
 * Query options for fetching a paginated list of posts.
 *
 * This function creates query options for React Query to fetch posts
 * with pagination parameters.
 *
 * @param params - Query parameters
 * @param params.page - Page number (1-indexed)
 * @param params.limit - Maximum number of posts to return
 * @returns React Query options object
 */
export const postsQueryOptions = (params: { page: number; limit: number }) => {
  //return
  return queryOptions({
    queryKey: POST_QUERY_KEYS.posts(params.page, params.limit),
    queryFn: async () => {
      //return
      return await getPosts({ page: params.page, limit: params.limit });
    },
  });
};

//function
/**
 * Infinite query options for fetching posts with pagination.
 */
export const postsInfiniteQueryOptions = () => {
  //return
  return infiniteQueryOptions({
    queryKey: POST_QUERY_KEYS.postsInfinite(),
    queryFn: async ({ pageParam = 1 }) => {
      //return
      return await getPosts({ page: pageParam, limit: 5 });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination?.hasNextPage) {
        //return
        return undefined;
      }
      //return
      return lastPage.pagination.page + 1;
    },
    initialPageParam: 1,
  });
};
