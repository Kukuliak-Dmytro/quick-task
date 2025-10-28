import { type InferSelectModel } from "drizzle-orm";
import { comments, user } from "@/shared/lib/db/schemas";

/**
 * Base comment type inferred from the database schema.
 */
type Comment = InferSelectModel<typeof comments>;
type Author = InferSelectModel<typeof user>;

/**
 * Comment type with author information.
 *
 * This extends the base comment type with author details
 * fetched via join from the user table.
 */
export interface IComment extends Comment {
  author: Author | null;
}

/**
 * Parameters for fetching comments for a specific post.
 */
export interface ICommentsParams {
  postId: string;
  page?: number;
  limit?: number;
}

/**
 * Pagination metadata interface for comments.
 */
export interface ICommentsPaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Response interface for paginated comments.
 */
export interface ICommentsResponse {
  comments: IComment[];
  total: number;
  pagination: ICommentsPaginationInfo;
}

/**
 * Interface for creating a new comment.
 */
export interface ICreateComment {
  content: string;
  postId: string;
  authorId: string;
}

