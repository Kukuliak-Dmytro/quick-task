import { createCommentAction } from "@/features/create-comment";
import { getSession } from "@/shared/utils/auth-utils";
import Link from "next/link";

interface ICommentFormProps {
  postId: string;
}

/**
 * Comment form component using server actions.
 *
 * This component uses a native HTML form with server actions,
 * avoiding client-side JavaScript for optimal performance.
 * The form submits to the server action which handles comment creation.
 * Shows login prompt for unauthenticated users.
 */
export const CommentForm = async ({ postId }: ICommentFormProps) => {
  const session = await getSession();
  // If user is not authenticated, show login prompt
  if (!session?.user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You need to be logged in to post a comment.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md
              hover:bg-blue-700 focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50
              dark:hover:bg-gray-800 focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Register
          </Link>
        </div>
      </div>
    );
  }

  // If user is authenticated, show comment form
  return (
    <form action={createCommentAction} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300
            mb-2">
          Add a Comment
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300
            dark:border-gray-600 rounded-md shadow-sm focus:outline-none
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700 dark:text-white"
          placeholder="Share your thoughts..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Post Comment
        </button>
      </div>
    </form>
  );
};
