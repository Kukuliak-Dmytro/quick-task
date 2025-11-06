export type { IGetPostsParams, ICreatePostData } from "./posts";
export {
  getPosts,
  POST_QUERY_KEYS,
  postsInfiniteQueryOptions,
  createPost,
  getPostById,
  POST_BY_ID_QUERY_KEYS,
  postByIdQueryOptions,
} from "./posts";
export type { IGetCommentsParams, ICreateCommentData } from "./comments";
export {
  getComments,
  createComment,
  COMMENT_QUERY_KEYS,
  commentsInfiniteQueryOptions,
} from "./comments";
