import { Suspense } from "react";
import Link from "next/link";

/**
 * Posts layout component.
 *
 * This layout provides navigation and wraps all post pages in Suspense
 * to handle async data fetching properly.
 */
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/posts"
              className="text-lg font-semibold text-gray-900 dark:text-white
                hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              ← Back to Posts
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400
                hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="animate-pulse">
              <div
                className="bg-gray-200 dark:bg-gray-700 h-8 w-3/4 rounded mb-4"></div>
              <div
                className="bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded mb-6"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded mb-8"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded"></div>
            </div>
          </div>
        }>
        {children}
      </Suspense>
    </div>
  );
}
