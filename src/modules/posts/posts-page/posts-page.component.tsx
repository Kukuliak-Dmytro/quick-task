import { Suspense } from "react";
import { PostList, PostListSkeleton } from "@/widgets/posts";

/**
 * Main posts page component with streaming server-side rendering.
 *
 * This component uses React Server Components with Suspense boundaries to
 * stream posts data progressively. The page shell renders immediately while
 * the post content streams in, providing excellent perceived performance.
 *
 * @returns Promise that resolves to JSX element representing the posts page
 */
export const PostsPageComponent = async () => {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList />
    </Suspense>
  );
};

export default PostsPageComponent;
