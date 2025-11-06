export type { IGetCommentsParams, ICreateCommentData } from "./comment.api";
export { getComments, createComment } from "./comment.api";
export {
  COMMENT_QUERY_KEYS,
  commentsInfiniteQueryOptions,
} from "./comment.query";
export { createComment as createCommentMutation } from "./comment.mutation";
