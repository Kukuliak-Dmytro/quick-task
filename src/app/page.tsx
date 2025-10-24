import { PostsPageComponent } from "@/modules/posts/posts-page/posts-page.component";
import { requireAuth } from "@/shared/utils/auth-utils";

/**
 * Home page component.
 *
 * This page demonstrates server-side prefetching with TanStack Query.
 * Data is fetched on the server and hydrated on the client for optimal
 * performance and SEO. Requires authentication to access.
 *
 * @returns Promise that resolves to JSX element representing the home page
 */
export default async function Home() {
  // Require authentication - redirects to login if not authenticated
  await requireAuth();

  return <PostsPageComponent />;
}
