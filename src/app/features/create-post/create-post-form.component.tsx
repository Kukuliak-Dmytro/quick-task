"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { createPost, POST_QUERY_KEYS } from "@/app/entities/api";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/app/shared/components/ui/field";
import { trackPostCreation } from "@/pkg/integrations/mixpanel";
import { usePaginationStore } from "@/app/features/pagination";
import { createPostSchema, ICreatePostSchema } from "./create-post.interface";

//component
/**
 * CreatePostForm component for creating new posts.
 */
export const CreatePostForm = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const resetPagination = usePaginationStore((state) => state.resetPagination);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  // Create post mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      // Track post creation in Mixpanel
      trackPostCreation(post.id, post.title, post.published);

      // Invalidate all posts queries to refetch the list
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.postsBase(),
      });
      // Invalidate all infinite queries (with any search parameter)
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === "posts-infinite"
          );
        },
      });

      // Reset pagination
      resetPagination();

      // Reset form
      reset();
      setIsOpen(false);
    },
  });

  const onSubmit = (data: ICreatePostSchema) => {
    mutation.mutate({
      title: data.title.trim(),
      content: data.content.trim(),
      published: true,
    });
  };

  if (!isOpen) {
    //return
    return (
      <div className="mb flex justify-center">
        <Button onClick={() => setIsOpen(true)} size="lg">
          {t("create_post_button")}
        </Button>
      </div>
    );
  }

  //return
  return (
    <div className="mb-8 border rounded-lg p-6 bg-card max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t("create_post_title")}</h2>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          {t("create_post_cancel")}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field>
          <FieldLabel htmlFor="title">
            {t("create_post_label_title")}
          </FieldLabel>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder={t("create_post_placeholder_title")}
            disabled={mutation.isPending}
          />
          <FieldError errors={errors.title ? [errors.title] : []} />
        </Field>

        <Field>
          <FieldLabel htmlFor="content">
            {t("create_post_label_content")}
          </FieldLabel>
          <textarea
            {...register("content")}
            id="content"
            placeholder={t("create_post_placeholder_content")}
            rows={6}
            className="w-full px-4 py-2 border border-border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary resize-vertical
              bg-background text-foreground disabled:opacity-50
              disabled:cursor-not-allowed"
            disabled={mutation.isPending}
          />
          <FieldError errors={errors.content ? [errors.content] : []} />
        </Field>

        {/* Error Message */}
        {mutation.isError && (
          <div
            className="p-3 rounded-lg bg-destructive/10 text-destructive border
              border-destructive/20 text-sm">
            {t("create_post_error")}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending} size="lg">
            {mutation.isPending
              ? t("create_post_creating")
              : t("create_post_submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};
