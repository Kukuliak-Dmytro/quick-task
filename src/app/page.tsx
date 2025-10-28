import { Suspense } from "react";
import { PostsList } from "@/modules/posts-list";
import { PostListSkeleton } from "@/modules/posts-list";
import { requireAuth } from "@/shared/utils/auth-utils";

/**
 * Home page component with streaming server-side rendering.
 *
 * This page uses React Server Components with Suspense boundaries to stream
 * content progressively. Authentication is verified server-side, and posts
 * are fetched directly from the database for optimal performance and SEO.
 * Requires authentication to access.
 *
 * @returns Promise that resolves to JSX element representing the home page
 */
const Home = async () => {
  // Require authentication - redirects to login if not authenticated
  await requireAuth();

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostsList />
    </Suspense>
  );
};
export default Home;
