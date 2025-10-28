import Link from "next/link";

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
  return (
    <>
      <h1>Welcome to the home page</h1>
      <Link href="/posts">Posts</Link>
    </>
  );
};
export default Home;
