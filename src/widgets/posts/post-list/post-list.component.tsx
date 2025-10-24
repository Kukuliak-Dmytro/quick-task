"use client";

import { useQuery } from "@tanstack/react-query";
import { postsQueryOptions } from "@/entities/api";
import { PostCard } from "../post-card";
import { CreatePostForm } from "@/features/create-post";

/**
 * PostList component for displaying all posts
 *
 * This component fetches posts using TanStack Query and displays them
 * in a grid layout. It handles loading and error states and includes
 * the ability to create new posts.
 *
 * @returns PostList component
 */
export const PostList = () => {
  const { data, isLoading, error } = useQuery(postsQueryOptions());

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2
                border-foreground mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-destructive text-lg mb-2">Error loading posts</p>
            <p className="text-muted-foreground text-sm">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state with posts
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Posts</h1>
        <p className="text-muted-foreground">Total posts: {data?.total ?? 0}</p>
      </div>

      {/* Create Post Form */}
      <CreatePostForm />

      {/* Empty state */}
      {!data || data.posts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              No posts yet. Create your first post!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
