import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { getPosts } from "./post.api";

//constant
export const POST_QUERY_KEYS = {
  postsBase: () => ["posts"] as const,
  posts: (page: number, limit: number, search: string) =>
    ["posts", page, limit, search] as const,
  postsInfinite: (search: string) => ["posts-infinite", search] as const,
} as const;

//function
/**
 * Query options for fetching a paginated list of posts.
 *
 * This function creates query options for React Query to fetch posts
 * with pagination and search parameters.
 *
 * @param params - Query parameters
 * @param params.page - Page number (1-indexed)
 * @param params.limit - Maximum number of posts to return
 * @param params.search - Search query string
 * @returns React Query options object
 */
export const postsQueryOptions = (params: {
  page: number;
  limit: number;
  search: string;
}) => {
  //return
  return queryOptions({
    queryKey: POST_QUERY_KEYS.posts(params.page, params.limit, params.search),
    queryFn: async () => {
      //return
      return await getPosts({
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
      });
    },
  });
};

//function
/**
 * Infinite query options for fetching posts with pagination and search.
 *
 * @param params - Query parameters
 * @param params.search - Search query string
 * @returns React Query infinite query options object
 */
export const postsInfiniteQueryOptions = (params: { search: string }) => {
  //return
  return infiniteQueryOptions({
    queryKey: POST_QUERY_KEYS.postsInfinite(params.search),
    queryFn: async ({ pageParam = 1 }) => {
      //return
      return await getPosts({
        page: pageParam,
        limit: 5,
        search: params.search || undefined,
      });
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
