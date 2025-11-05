import Link from "next/link";

/**
 * HomeModule component.
 *
 * This module provides a simple landing page with a link to the posts page.
 *
 * @returns JSX element representing the home module
 */
export const HomeModule = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome</h1>
        <p className="mb-6 text-muted-foreground">
          Get started by exploring the posts
        </p>
        <Link
          href="/posts"
          className="inline-flex items-center justify-center rounded-md
            bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
            hover:bg-primary/90">
          View Posts
        </Link>
      </div>
    </div>
  );
};

