import { Suspense } from "react";
import { PostsList } from "@/modules/posts-list";
import { PostListSkeleton } from "@/modules/posts-list";

/**
 * Posts page component with streaming server-side rendering.
 *
 * This page uses React Server Components with Suspense boundaries to
 * stream posts data progressively. The page shell renders immediately while
 * the post content streams in, providing excellent perceived performance.
 *
 * @returns Promise that resolves to JSX element representing the posts page
 */
export default async function PostsPage() {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostsList />
    </Suspense>
  );
}
