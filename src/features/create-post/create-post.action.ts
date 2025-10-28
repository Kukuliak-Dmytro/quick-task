"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/shared/lib/db/auth";
import { db } from "@/shared/lib/db/database";
import { posts } from "@/shared/lib/db/schemas";
import { headers } from "next/headers";
import { z } from "zod";

/**
 * Zod schema for post creation validation.
 *
 * @constant createPostSchema
 */
const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(true),
});

/**
 * Server action result type for post creation.
 *
 * @interface ICreatePostResult
 */
export interface ICreatePostResult {
  success: boolean;
  error?: string;
  postId?: string;
}

/**
 * Create post server action.
 *
 * This server action creates a new blog post with title and content.
 * It validates the user's authentication, validates the input data,
 * inserts the post into the database via Drizzle ORM, and revalidates
 * the home page to show the new post immediately.
 *
 * @param _prevState - Previous state from useActionState (unused)
 * @param formData - FormData containing title, content, and published status
 * @returns Promise that resolves to post creation result
 */
export async function createPostAction(
  _prevState: ICreatePostResult,
  formData: FormData,
): Promise<ICreatePostResult> {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to create a post",
      };
    }

    // Extract and validate form data
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "true";

    // Validate inputs
    const validatedFields = createPostSchema.safeParse({
      title,
      content,
      published,
    });

    if (!validatedFields.success) {
      const errors = validatedFields.error.issues.map((err) => err.message);
      return {
        success: false,
        error: errors.join(", "),
      };
    }

    // Generate unique ID for the post
    const postId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Insert post into database
    await db.insert(posts).values({
      id: postId,
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      published: validatedFields.data.published,
      authorId: session.user.id,
    });

    // Revalidate the home page to show the new post
    revalidatePath("/");

    return {
      success: true,
      postId,
    };
  } catch (err: unknown) {
    console.error("Error creating post:", err);
    return {
      success: false,
      error: (err as Error).message || "Failed to create post",
    };
  }
}
