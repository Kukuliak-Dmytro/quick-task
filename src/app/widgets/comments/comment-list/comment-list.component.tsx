"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { commentsInfiniteQueryOptions } from "@/app/entities/api";

interface ICommentListProps {
  postId: string;
}

export const CommentList = ({ postId }: ICommentListProps) => {
  const query = useInfiniteQuery(commentsInfiniteQueryOptions(postId));

  if (query.status === "pending") return <div>Loading comments…</div>;
  if (query.status === "error") return <div>Failed to load comments</div>;

  const items = query.data.pages.flatMap((p) => p.comments);

  return (
    <div>
      {items.map((c) => (
        <div key={c.id} className="py-2 border-b border-border">
          <div className="text-sm text-muted-foreground">
            {c.author?.name ?? "Unknown"}
          </div>
          <div>{c.content}</div>
        </div>
      ))}

      {query.hasNextPage && (
        <button
          onClick={() => query.fetchNextPage()}
          disabled={query.isFetchingNextPage}>
          {query.isFetchingNextPage ? "Loading…" : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CommentList;
