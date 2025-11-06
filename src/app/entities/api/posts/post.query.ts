import { infiniteQueryOptions } from "@tanstack/react-query";
import { getPosts } from "./post.api";

//constant
export const POST_QUERY_KEYS = {
  posts: () => ["posts"] as const,
} as const;

//function
/**
 * Infinite query options for fetching posts with pagination.
 */
export const postsInfiniteQueryOptions = () => {
  //return
  return infiniteQueryOptions({
    queryKey: POST_QUERY_KEYS.posts(),
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
