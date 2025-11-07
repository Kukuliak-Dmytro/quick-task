"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { postsQueryOptions } from "@/app/entities/api";
import { PostCard } from "./post-card.component";
import { PostCardSkeleton } from "./post-card-skeleton.component";
import {
  usePaginationStore,
  PaginationComponent,
} from "@/app/features/pagination";
import { renderList } from "../utils/render-list.utils";

//component
/**
 * PostListPaginated component for displaying posts with pagination.
 */
export const PostListPaginated = () => {
  const t = useTranslations();

  const page = usePaginationStore((state) => state.page);
  const limit = usePaginationStore((state) => state.limit);
  const setPage = usePaginationStore((state) => state.setPage);
  const setTotal = usePaginationStore((state) => state.setTotal);

  const { data, isLoading, error, isFetching } = useQuery(
    postsQueryOptions({ page, limit }),
  );

  useEffect(() => {
    if (data?.total) {
      setTotal(data.total);
    }
  }, [data?.total, setTotal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  if (isLoading) {
    //return
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="h-4 w-32 bg-muted rounded mx-auto animate-pulse" />
        </div>

        {renderList({
          items: 3,
          renderItem: (_, i) => <PostCardSkeleton key={i} />,
          gap: 24,
        })}
      </div>
    );
  }

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

  if (isFetching && !isLoading && data) {
    //return
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="h-4 w-32 bg-muted rounded mx-auto animate-pulse" />
        </div>

        {renderList({
          items: limit,
          renderItem: (_, i) => <PostCardSkeleton key={i} />,
          gap: 24,
        })}
      </div>
    );
  }

  //return
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          {t("posts_total", { count: data?.total ?? 0 })}
        </p>
      </div>

      {/* Empty state */}
      {!data?.posts || data.posts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">{t("posts_empty")}</p>
          </div>
        </div>
      ) : (
        <>
          {renderList({
            items: data.posts,
            renderItem: (post) => <PostCard key={post.id} post={post} />,
            gap: 24,
          })}

          {/* Pagination Component */}
          {data.total && (
            <div className="mt-8">
              <PaginationComponent
                total={data.total}
                page={page}
                limit={limit}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
