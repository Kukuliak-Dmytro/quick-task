import { type InferSelectModel } from "drizzle-orm";
import { comments } from "@/pkg/libraries/drizzle";
import type { IUser } from "./user.model";
/**
 * Base comment type inferred from the database schema.
 */
type BaseComment = InferSelectModel<typeof comments>;

export interface IComment extends BaseComment {
  author: IUser | null;
}

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
