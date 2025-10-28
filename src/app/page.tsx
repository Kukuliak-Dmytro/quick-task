import { PostsPageComponent } from "@/modules/posts/posts-page/posts-page.component";
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
export default async function Home() {
  // Require authentication - redirects to login if not authenticated
  await requireAuth();

  return <PostsPageComponent />;
}
