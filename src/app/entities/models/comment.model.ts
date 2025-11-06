import { type InferSelectModel } from "drizzle-orm";
import { comments } from "@/pkg/libraries/drizzle";
import type { IUser } from "./user.model";

//interface
type IBaseComment = InferSelectModel<typeof comments>;

//interface
/**
 * Comment interface with author information.
 */
export interface IComment extends IBaseComment {
  author: IUser | null;
}

//interface
/**
 * Response interface for paginated comments.
 */
export interface ICommentsResponse {
  comments: IComment[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
