import { getPostsServer } from "@/entities/api/posts/post.server";
import { PostCard } from "../post-card";
import { CreatePostForm } from "@/features/create-post";

/**
 * PostList component rendered on the server.
 *
 * Fetches and renders the initial page of posts directly on the server for
 * fast initial loads and SEO. Bypasses API routes and React Query.
 */
export const PostList = async () => {
  const { posts, total } = await getPostsServer({ page: 1, limit: 5 });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Posts</h1>
        <p className="text-muted-foreground">Total posts: {total}</p>
      </div>

      {/* Create Post Form */}
      <CreatePostForm />

      {/* Empty state */}
      {posts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              No posts yet. Create your first post!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
