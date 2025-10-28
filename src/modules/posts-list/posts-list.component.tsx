import { getPostsServer } from "@/entities/api/posts/post.server";
import { PostCard } from "@/widgets/post-card";
import { CreatePostForm } from "@/features/create-post";
import { IPost } from "@/shared/interfaces/post";

/**
 * PostsList module component rendered on the server.
 *
 * This module handles the business logic for displaying posts including:
 * - Data fetching and pagination
 * - Orchestrating widgets (PostCard, CreatePostForm)
 * - Managing empty states
 * - Server-side rendering for performance
 */
export const PostsList = async () => {
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
            <PostCard key={post.id} post={post as IPost} />
          ))}
        </div>
      )}
    </div>
  );
};
