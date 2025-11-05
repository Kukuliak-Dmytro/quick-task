"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { createComment, COMMENT_QUERY_KEYS } from "@/app/entities/api";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";

// interface
interface ICreateCommentProps {
  postId: string;
}

/**
 * CreateComment component for creating new comments.
 *
 * @param props - Component props containing the post ID
 * @returns JSX element representing the create comment form
 */
export const CreateComment = ({ postId }: ICreateCommentProps) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // Invalidate comments query to refetch the list
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEYS.commentsByPost(postId),
      });

      // Reset form
      setContent("");
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    mutation.mutate({
      postId,
      content: content.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("comment_placeholder")}
          disabled={mutation.isPending || isSubmitting}
          className="w-full"
        />
      </div>

      {mutation.isError && (
        <div className="text-sm text-red-500">
          {mutation.error instanceof Error
            ? mutation.error.message
            : t("comment_create_error")}
        </div>
      )}

      <Button
        type="submit"
        disabled={!content.trim() || mutation.isPending || isSubmitting}>
        {mutation.isPending || isSubmitting
          ? t("comment_posting")
          : t("comment_post_button")}
      </Button>
    </form>
  );
};
