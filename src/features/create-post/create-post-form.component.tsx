"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, POST_QUERY_KEYS } from "@/entities/api";
import { Button } from "@/shared/components/ui/button";

/**
 * CreatePostForm component for creating new posts
 *
 * This component provides a form for authenticated users to create
 * new posts with title and content. All posts are published immediately.
 */
export const CreatePostForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Create post mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate posts query to refetch the list
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.posts() });

      // Reset form
      setTitle("");
      setContent("");
      setIsOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    mutation.mutate({
      title: title.trim(),
      content: content.trim(),
      published: true, // Always publish immediately
    });
  };

  if (!isOpen) {
    return (
      <div className="mb-6 flex justify-center">
        <Button onClick={() => setIsOpen(true)} size="lg">
          Create New Post
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8 border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Create New Post</h2>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-2 text-foreground">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-2 border border-border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary bg-background
              text-foreground"
            required
            disabled={mutation.isPending}
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-2 text-foreground">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            rows={6}
            className="w-full px-4 py-2 border border-border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary resize-vertical
              bg-background text-foreground"
            required
            disabled={mutation.isPending}
          />
        </div>

        {/* Error Message */}
        {mutation.isError && (
          <div
            className="p-3 rounded-lg bg-destructive/10 text-destructive border
              border-destructive/20 text-sm">
            Failed to create post. Please try again.
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending} size="lg">
            {mutation.isPending ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};
