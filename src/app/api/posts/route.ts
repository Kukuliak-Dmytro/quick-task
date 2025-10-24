import { NextResponse } from "next/server";
import { db } from "@/shared/lib/db/database";
import { posts, user } from "@/shared/lib/db/schemas";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/shared/lib/db/auth";
import { headers } from "next/headers";

/**
 * GET /api/posts
 * Fetches all posts from the database across all users with author information
 * Requires authentication
 *
 * @returns JSON response with posts array (including author details) and total count
 */
export async function GET() {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all posts with author information via join
    const allPosts = await db
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
      .orderBy(desc(posts.createdAt));

    return NextResponse.json({
      posts: allPosts,
      total: allPosts.length,
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
 * Creates a new post
 * Requires authentication
 *
 * @returns JSON response with the created post
 */
export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
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
