import { notFound } from "next/navigation";
import { getCommentsServer } from "@/entities/api/comments";
import { getPostById } from "@/entities/api/posts/post.server";
import { IComment } from "@/shared/interfaces/comment";
import { CommentForm } from "@/features/create-comment";
import { CommentsListSkeleton } from "@/shared/components/ui/comments-list-skeleton.component";
import { PostCardSkeleton } from "@/widgets/post-card";
import { Suspense } from "react";
import Link from "next/link";

/**
 * Individual post page component.
 *
 * This page displays a single post with its full content and associated comments.
 * It fetches both post data and comments separately for optimal performance.
 * Comments are loaded lazily only when visiting this specific post page.
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation Links */}
      <div className="mb-6 flex items-center gap-4 text-sm">
        <Link
          href="/posts"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800
            dark:hover:text-blue-300 transition-colors">
          ← All Posts
        </Link>
        <span className="text-gray-400">•</span>
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900
            dark:hover:text-white transition-colors">
          Home
        </Link>
      </div>

      {/* Post Content */}
      <Suspense fallback={<PostCardSkeleton />}>
        <PostContent id={id} />
      </Suspense>

      {/* Comments Section */}
      <CommentsSection id={id} />
    </div>
  );
}

/**
 * Post content component that fetches and displays a single post.
 */
async function PostContent({ id }: { id: string }) {
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  // Artificial delay for testing skeleton loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <article className="mb-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div
          className="flex items-center gap-4 text-sm text-gray-600
            dark:text-gray-400">
          <span>By {post.author?.name || "Unknown Author"}</span>
          <span>•</span>
          <time dateTime={post.createdAt.toISOString()}>
            {post.createdAt.toLocaleDateString()}
          </time>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>
    </article>
  );
}

/**
 * Comments list component that fetches and displays comments for a post.
 */
async function CommentsList({ id }: { id: string }) {
  const commentsResponse = await getCommentsServer({
    postId: id,
    page: 1,
    limit: 20,
  });

  // Artificial delay for testing skeleton loading state
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="space-y-6 mb-8">
      {commentsResponse.comments.map((comment: IComment) => (
        <div key={comment.id} className="border-b pb-4 last:border-b-0">
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex
                items-center justify-center">
              <span className="text-sm font-medium">
                {comment.author?.name?.charAt(0) || "?"}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {comment.author?.name || "Anonymous"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {comment.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Comments section component that displays the comments section structure.
 */
async function CommentsSection({ id }: { id: string }) {
  // Get comments count for the header
  const commentsResponse = await getCommentsServer({
    postId: id,
    page: 1,
    limit: 1, // We only need the count, so limit to 1
  });

  return (
    <section className="border-t pt-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Comments ({commentsResponse.total})
      </h2>

      {/* Comments List - wrapped in Suspense */}
      <Suspense fallback={<CommentsListSkeleton />}>
        <CommentsList id={id} />
      </Suspense>

      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <CommentForm postId={id} />
      </div>
    </section>
  );
}
