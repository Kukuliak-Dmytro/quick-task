import { infiniteQueryOptions } from "@tanstack/react-query";
import { getComments } from "./comment.api";

export const COMMENT_QUERY_KEYS = {
  commentsByPost: (postId: string) => ["comments", { postId }] as const,
} as const;

export const commentsInfiniteQueryOptions = (postId: string) => {
  return infiniteQueryOptions({
    queryKey: COMMENT_QUERY_KEYS.commentsByPost(postId),
    queryFn: async ({ pageParam = 1 }) => {
      return await getComments({ postId, page: pageParam, limit: 10 });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};



