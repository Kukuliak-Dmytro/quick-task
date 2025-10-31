import { NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { auth } from "@/shared/lib/db/auth";
import { headers } from "next/headers";
import { db } from "@/shared/lib/db/database";
import { comments, posts, user } from "@/shared/lib/db/schemas";

/**
 * GET /api/comments
 * List comments for a post with pagination
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 },
      );
    }

    const offset = (page - 1) * limit;

    // total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(comments)
      .where(eq(comments.postId, postId));

    // list with author
    const rows = await db
      .select({
        id: comments.id,
        postId: comments.postId,
        authorId: comments.authorId,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(comments)
      .leftJoin(user, eq(comments.authorId, user.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt))
      .limit(limit)
      .offset(offset);

    const totalPages = Math.max(1, Math.ceil(count / limit));

    return NextResponse.json({
      comments: rows,
      total: count,
      pagination: {
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error listing comments:", error);
    return NextResponse.json(
      { error: "Failed to list comments" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/comments
 * Create a new comment for a post
 */
export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { postId, content } = body ?? {};

    if (!postId || !content) {
      return NextResponse.json(
        { error: "postId and content are required" },
        { status: 400 },
      );
    }

    // Ensure post exists
    const existingPost = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);
    if (!existingPost.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const commentId = `comment-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    const [created] = await db
      .insert(comments)
      .values({
        id: commentId,
        postId,
        authorId: session.user.id,
        content,
      })
      .returning();

    const [withAuthor] = await db
      .select({
        id: comments.id,
        postId: comments.postId,
        authorId: comments.authorId,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(comments)
      .leftJoin(user, eq(comments.authorId, user.id))
      .where(and(eq(comments.id, created.id)));

    return NextResponse.json(withAuthor, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
