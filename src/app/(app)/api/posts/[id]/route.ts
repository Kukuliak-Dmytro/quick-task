import { NextResponse } from "next/server";
import { db, posts, user } from "@/pkg/libraries/drizzle";
import { eq } from "drizzle-orm";
import { requireSession } from "../../lib";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    // Verify authentication
    const authResult = await requireSession(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = await ctx.params;
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
      .where(eq(posts.id, id))
      .limit(1);

    if (!postWithAuthor.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(postWithAuthor[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}
