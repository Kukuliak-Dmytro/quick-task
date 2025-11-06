"use client";

import { useTranslations } from "next-intl";
import { IComment } from "@/app/entities/models";

//interface
interface ICommentProps {
  comment: IComment;
}

//component
/**
 * Comment component for displaying a single comment.
 */
export const Comment = ({ comment }: ICommentProps) => {
  const t = useTranslations();

  //return
  return (
    <div className="py-2 border-b border-border">
      <div className="text-sm text-muted-foreground">
        {comment.author?.name ?? t("comment_author_unknown")}
      </div>
      <div>{comment.content}</div>
    </div>
  );
};
