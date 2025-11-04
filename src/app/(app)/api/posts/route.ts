import { NextResponse } from "next/server";
import { db } from "@/app/shared/lib/db/database";
import { posts, user } from "@/app/shared/lib/db/schemas";
import { desc, eq, count } from "drizzle-orm";
import { auth } from "@/app/shared/lib/db/auth";

/**
 * GET /api/posts
 * Fetches posts from the database with pagination support.
 *
 * This endpoint retrieves posts with pagination support, including author information
 * via database joins. Requires authentication and supports query parameters for
 * page and limit customization.
 *
 * @param request - The incoming request with search params for pagination
 * @returns JSON response with posts array, pagination metadata, and total count
 * @throws {401} Unauthorized if no valid session
 * @throws {500} Internal server error if database operation fails
 */
export async function GET(request: Request) {
  try {
    // Verify authentication - pass request headers directly
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse search params for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const offset = (page - 1) * limit;

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
          image: user.image,
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

    return NextResponse.json({
      posts: paginatedPosts,
      total: totalCount,
      pagination: {
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/posts
 * Creates a new post.
 *
 * This endpoint creates a new post with the provided title, content, and publication
 * status. Requires authentication and validates required fields before creation.
 * Returns the created post with author information.
 *
 * @param request - The incoming request with post data in JSON body
 * @returns JSON response with the created post including author information
 * @throws {401} Unauthorized if no valid session
 * @throws {400} Bad request if required fields are missing
 * @throws {500} Internal server error if database operation fails
 */
export async function POST(request: Request) {
  try {
    // Verify authentication - pass request headers directly
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { title, content, published = false } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    // Generate unique ID for the post
    const postId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Create the post
    const [newPost] = await db
      .insert(posts)
      .values({
        id: postId,
        title,
        content,
        published,
        authorId: session.user.id,
      })
      .returning();

    // Fetch the post with author information
    const postWithAuthor = await db
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
          image: user.image,
        },
      })
      .from(posts)
      .leftJoin(user, eq(posts.authorId, user.id))
      .where(eq(posts.id, newPost.id))
      .limit(1);

    return NextResponse.json(postWithAuthor[0], { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
