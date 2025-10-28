import "server-only";

import { db } from "@/shared/lib/db/database";
import { posts, user } from "@/shared/lib/db/schemas";
import { desc, eq, count } from "drizzle-orm";
import { IPaginationParams, IPost } from "@/shared/interfaces/post";
import { requireAuth } from "@/shared/utils/auth-utils";
/**
 * Fetch posts directly from the database on the server.
 *
 * This function retrieves posts with pagination support using Drizzle ORM
 * directly, bypassing API routes for optimal server-side rendering performance.
 * It includes author information via database joins.
 *
 * @param params - Optional pagination parameters
 * @returns Promise that resolves to posts array with pagination metadata
 * @throws {Error} Throws an error if database operation fails
 */
export async function getPostsServer(params?: IPaginationParams) {
  const page = params?.page || 1;
  const limit = params?.limit || 5;
  const offset = (page - 1) * limit;
  // data access control
  //don't make a separate layer, just a quick check
  await requireAuth();
  try {
    // Get total count for pagination info
    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(posts);

    // Fetch paginated posts with author information via join
    const paginatedPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        published: posts.published,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
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
      .from(posts)
      .leftJoin(user, eq(posts.authorId, user.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      posts: paginatedPosts,
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
    console.error("Error fetching posts from server:", error);
    throw new Error("Failed to fetch posts");
  }
}

/**
 * Fetch a single post by ID directly from the database on the server.
 *
 * This function retrieves a specific post with its author information using Drizzle ORM
 * directly, bypassing API routes for optimal server-side rendering performance.
 *
 * @param postId - The ID of the post to fetch
 * @returns Promise that resolves to the post with author information, or null if not found
 * @throws {Error} Throws an error if database operation fails
 */
export async function getPostById(postId: string): Promise<IPost | null> {
  // Data access control - require authentication
  await requireAuth();

  try {
    // Fetch the specific post with author information via join
    const [post] = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        published: posts.published,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
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
      .from(posts)
      .leftJoin(user, eq(posts.authorId, user.id))
      .where(eq(posts.id, postId))
      .limit(1);

    return post || null;
  } catch (error) {
    console.error("Error fetching post by ID from server:", error);
    throw new Error("Failed to fetch post");
  }
}
