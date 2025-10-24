import { type InferSelectModel } from "drizzle-orm";
import { posts } from "@/shared/lib/db/schemas";

/**
 * Base post type inferred from the database schema.
 */
type BasePost = InferSelectModel<typeof posts>;

/**
 * Author information included with posts
 */
export interface IPostAuthor {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

/**
 * Post type with author information.
 *
 * This extends the base post type with author details
 * fetched via join from the user table.
 */
export interface IPost extends BasePost {
  author: IPostAuthor | null;
}

/**
 * Response interface for paginated posts
 */
export interface IPostsResponse {
  posts: IPost[];
  total: number;
}
