import { type InferSelectModel } from "drizzle-orm";
import { posts } from "@/pkg/libraries/drizzle";
import type { IUser } from "./user.model";

//interface
/**
 * Post interface with author information.
 */
type IBasePost = InferSelectModel<typeof posts>;

export interface IPost extends IBasePost {
  author: IUser | null;
}

//interface
/**
 * Pagination metadata interface.
 */
export interface IPaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

//interface
/**
 * Response interface for paginated posts.
 */
export interface IPostsResponse {
  posts: IPost[];
  total: number;
  pagination: IPaginationInfo;
}
