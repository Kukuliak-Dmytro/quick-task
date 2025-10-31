import { type InferSelectModel } from "drizzle-orm";
import { comments } from "@/shared/lib/db/schemas";

/**
 * Base comment type inferred from the database schema.
 */
type BaseComment = InferSelectModel<typeof comments>;

export interface ICommentAuthor {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface IComment extends BaseComment {
  author: ICommentAuthor | null;
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



