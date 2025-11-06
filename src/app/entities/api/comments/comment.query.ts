import { infiniteQueryOptions } from "@tanstack/react-query";
import { getComments } from "./comment.api";

//constant
export const COMMENT_QUERY_KEYS = {
  commentsByPost: (postId: string) => ["comments", { postId }] as const,
} as const;

//function
/**
 * Infinite query options for fetching comments with pagination.
 */
export const commentsInfiniteQueryOptions = (postId: string) => {
  //return
  return infiniteQueryOptions({
    queryKey: COMMENT_QUERY_KEYS.commentsByPost(postId),
    queryFn: async ({ pageParam = 1 }) => {
      //return
      return await getComments({ postId, page: pageParam, limit: 10 });
    },
    getNextPageParam: (lastPage) => {
      //return
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};
