"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { commentsInfiniteQueryOptions } from "@/app/entities/api";
import { Comment } from "./comment.component";
import { CommentSkeleton } from "./skeleton.component";

//interface
interface ICommentListProps {
  postId: string;
}

//component
/**
 * CommentList component for displaying a list of comments with infinite scroll.
 */
export const CommentList = ({ postId }: ICommentListProps) => {
  const t = useTranslations();
  const query = useInfiniteQuery(commentsInfiniteQueryOptions(postId));

  if (query.status === "pending") {
    //return
    return (
      <div>
        {[...Array(3)].map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (query.status === "error") {
    //return
    return <div className="text-red-500">{t("comment_load_error")}</div>;
  }

  const items = query.data.pages.flatMap((p) => p.comments);

  //return
  return (
    <div>
      {items.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      {query.hasNextPage && (
        <button
          onClick={() => query.fetchNextPage()}
          disabled={query.isFetchingNextPage}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground
            rounded-md hover:bg-primary/90 disabled:opacity-50">
          {query.isFetchingNextPage
            ? t("comment_loading_more")
            : t("comment_load_more")}
        </button>
      )}
    </div>
  );
};
