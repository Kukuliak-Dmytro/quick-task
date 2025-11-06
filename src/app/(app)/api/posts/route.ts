import { NextResponse } from "next/server";
import { db, posts, user } from "@/pkg/libraries/drizzle";
import { desc, eq, count } from "drizzle-orm";
import { requireSession } from "../lib";

//function
/**
 * GET /api/posts - Fetches posts from the database with pagination support.
 */
export const GET = async (request: Request) => {
  try {
    // Verify authentication
    const authResult = await requireSession(request);
    if (authResult instanceof NextResponse) {
      //return
      return authResult;
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

    //return
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
    //return
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
};

//function
/**
 * POST /api/posts - Creates a new post.
 */
export const POST = async (request: Request) => {
  try {
    // Verify authentication
    const authResult = await requireSession(request);
    if (authResult instanceof NextResponse) {
      //return
      return authResult;
    }
    const { session } = authResult;

    // Parse request body
    const body = await request.json();
    const { title, content, published = false } = body;

    // Validate required fields
    if (!title || !content) {
      //return
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
        },
      })
      .from(posts)
      .leftJoin(user, eq(posts.authorId, user.id))
      .where(eq(posts.id, newPost.id))
      .limit(1);

    //return
    return NextResponse.json(postWithAuthor[0], { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    //return
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
};
