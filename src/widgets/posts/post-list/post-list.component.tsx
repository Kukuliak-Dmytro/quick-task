"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { postsInfiniteQueryOptions } from "@/entities/api";
import { PostCard } from "../post-card";
import { CreatePostForm } from "@/features/create-post";
import { Button } from "@/shared/components/ui/button";
import { useCallback } from "react";

/**
 * PostList component for displaying posts with infinite scroll.
 *
 * This component fetches posts using TanStack Query infinite query and displays them
 * in a grid layout. It handles loading and error states, includes the ability to create new posts,
 * and provides infinite scroll functionality with a "Load More" button.
 *
 * @returns JSX element representing the post list with infinite scroll functionality
 */
export const PostList = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(postsInfiniteQueryOptions());

  // Flatten all posts from all pages
  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <p className="text-muted-foreground">
          Total posts: {data?.pages[0]?.total ?? 0}
        </p>
      </div>

      {/* Create Post Form */}
      <CreatePostForm />

      {/* Empty state */}
      {allPosts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              No posts yet. Create your first post!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* Load More Button */}
          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                variant="outline"
                size="lg">
                {isFetchingNextPage ? (
                  <>
                    <div
                      className="animate-spin rounded-full h-4 w-4 border-b-2
                        border-current mr-2"></div>
                    Loading more posts...
                  </>
                ) : (
                  "Load More Posts"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
