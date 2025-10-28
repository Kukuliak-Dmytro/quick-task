"use server";

import { redirect } from "next/navigation";
import { createCommentServer } from "@/entities/api/comments";
import { requireAuth } from "@/shared/utils/auth-utils";

/**
 * Server action to create a new comment.
 *
 * This action handles comment creation using a form submission,
 * keeping all logic on the server side for optimal performance.
 * It validates the input, creates the comment, and redirects back
 * to the post page to show the new comment.
 *
 * @param formData - Form data containing comment content and post ID
 */
export async function createCommentAction(formData: FormData) {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  // Basic validation
  if (!content?.trim()) {
    throw new Error("Comment content is required");
  }

  if (!postId) {
    throw new Error("Post ID is required");
  }

  try {
    // Get the current user - requireAuth will redirect if not authenticated
    const session = await requireAuth();

    // Create the comment
    await createCommentServer({
      content: content.trim(),
      postId,
      authorId: session.user.id,
    });

    // Redirect back to the post page to show the new comment
    redirect(`/posts/${postId}`);
  } catch (error) {
    console.error("Error creating comment:", error);

    // Preserve the original error message if it's a known error
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to create comment");
  }
}
