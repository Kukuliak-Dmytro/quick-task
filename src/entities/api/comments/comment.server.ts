import "server-only";

import { db } from "@/shared/lib/db/database";
import { comments, user } from "@/shared/lib/db/schemas";
import { desc, eq, count, and } from "drizzle-orm";
import {
  ICommentsParams,
  ICommentsResponse,
  ICreateComment,
} from "@/shared/interfaces/comment";
import { requireAuth } from "@/shared/utils/auth-utils";

/**
 * Fetch comments for a specific post directly from the database on the server.
 *
 * This function retrieves comments with pagination support using Drizzle ORM
 * directly, bypassing API routes for optimal server-side rendering performance.
 * It includes author information via database joins and filters out deleted comments.
 * Comments are publicly viewable and do not require authentication.
 *
 * @param params - Parameters including postId and optional pagination
 * @returns Promise that resolves to comments array with pagination metadata
 * @throws {Error} Throws an error if database operation fails
 */
export async function getCommentsServer(
  params: ICommentsParams,
): Promise<ICommentsResponse> {
  const { postId, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  // Comments are publicly viewable - no authentication required

  try {
    // Get total count for pagination info (excluding deleted comments)
    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(comments)
      .where(and(eq(comments.postId, postId), eq(comments.isDeleted, false)));

    // Fetch paginated comments with author information via join
    const paginatedComments = await db
      .select({
        id: comments.id,
        content: comments.content,
        postId: comments.postId,
        authorId: comments.authorId,
        isDeleted: comments.isDeleted,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
      .from(comments)
      .leftJoin(user, eq(comments.authorId, user.id))
      .where(and(eq(comments.postId, postId), eq(comments.isDeleted, false)))
      .orderBy(desc(comments.createdAt))
      .limit(limit)
      .offset(offset);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      comments: paginatedComments,
      total: totalCount,
      pagination: {
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  } catch (error) {
    console.error("Error fetching comments from server:", error);
    throw new Error("Failed to fetch comments");
  }
}

/**
 * Create a new comment for a specific post.
 *
 * This function creates a new comment in the database with proper validation
 * and authentication checks.
 *
 * @param commentData - Comment data including content, postId, and authorId
 * @returns Promise that resolves to the created comment
 * @throws {Error} Throws an error if database operation fails or validation fails
 */
export async function createCommentServer(commentData: ICreateComment) {
  const { content, postId, authorId } = commentData;

  // Data access control - require authentication
  await requireAuth();

  // Basic validation
  if (!content.trim()) {
    throw new Error("Comment content cannot be empty");
  }

  if (!postId) {
    throw new Error("Post ID is required");
  }

  if (!authorId) {
    throw new Error("Author ID is required");
  }

  try {
    // Generate a unique ID for the comment
    const commentId = crypto.randomUUID();

    // Insert the new comment
    const [newComment] = await db
      .insert(comments)
      .values({
        id: commentId,
        content: content.trim(),
        postId,
        authorId,
        isDeleted: false,
      })
      .returning();

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }
}

/**
 * Soft delete a comment by setting isDeleted to true.
 *
 * This function performs a soft delete on a comment, preserving the data
 * while hiding it from public view. Useful for moderation purposes.
 *
 * @param commentId - The ID of the comment to delete
 * @param authorId - The ID of the comment author (for authorization)
 * @returns Promise that resolves to the updated comment
 * @throws {Error} Throws an error if database operation fails or user is not authorized
 */
export async function deleteCommentServer(commentId: string, authorId: string) {
  // Data access control - require authentication
  await requireAuth();

  try {
    // Verify the comment exists and belongs to the author
    const [existingComment] = await db
      .select()
      .from(comments)
      .where(and(eq(comments.id, commentId), eq(comments.authorId, authorId)));

    if (!existingComment) {
      throw new Error(
        "Comment not found or you don't have permission to delete it",
      );
    }

    // Perform soft delete
    const [deletedComment] = await db
      .update(comments)
      .set({ isDeleted: true })
      .where(eq(comments.id, commentId))
      .returning();

    return deletedComment;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}
