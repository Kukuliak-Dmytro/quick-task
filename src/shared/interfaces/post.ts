import { type InferSelectModel } from "drizzle-orm";
import { posts, user } from "@/shared/lib/db/schemas";

/**
 * Base post type inferred from the database schema.
 */
type Post = InferSelectModel<typeof posts>;
type Author = InferSelectModel<typeof user>;

/**
 * Post type with author information.
 *
 * This extends the base post type with author details
 * fetched via join from the user table.
 */
export interface IPost extends Post {
  author: Author | null;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Pagination metadata interface
 */
export interface IPaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Response interface for paginated posts
 */
export interface IPostsResponse {
  posts: IPost[];
  total: number;
  pagination: IPaginationInfo;
}
