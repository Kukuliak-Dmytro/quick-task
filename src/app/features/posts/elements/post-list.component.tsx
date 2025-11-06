"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { postsInfiniteQueryOptions } from "@/app/entities/api";
import { PostCard } from "./post-card.component";
import { PostCardSkeleton } from "./post-card-skeleton.component";
import { Button } from "@/app/shared/components/ui/button";
import { cn } from "@/app/shared/utils/utils";
import { useCallback } from "react";

//component
/**
 * PostList component for displaying posts with infinite scroll.
 */
export const PostList = () => {
  const t = useTranslations();
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

  // Loading state with skeleton
  if (isLoading) {
    //return
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="h-4 w-32 bg-muted rounded mx-auto animate-pulse" />
        </div>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    //return
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-destructive text-lg mb-2">
              {t("posts_load_error")}
            </p>
            <p className="text-muted-foreground text-sm">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state with posts
  //return
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          {t("posts_total", { count: data?.pages[0]?.total ?? 0 })}
        </p>
      </div>

      {/* Create Post Form */}

      {/* Empty state */}
      {allPosts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">{t("posts_empty")}</p>
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
                      className={cn(
                        `animate-spin rounded-full h-4 w-4 border-b-2
                          border-current mr-2`,
                      )}></div>
                    {t("posts_loading_more")}
                  </>
                ) : (
                  t("posts_load_more")
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
