"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPostAction } from "./create-post.action";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

/**
 * CreatePostForm component for creating new posts.
 *
 * This component provides a form for authenticated users to create
 * new posts with title and content. Uses Next.js server actions with
 * native HTML form validation for progressive enhancement. The form
 * revalidates the page automatically after successful creation.
 *
 * @returns JSX element representing the create post form
 */
export const CreatePostForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(createPostAction, {
    success: false,
  });

  // Close form and reset on success
  useEffect(() => {
    if (state.success) {
      // Use setTimeout to avoid synchronous state updates in effect
      setTimeout(() => {
        setIsOpen(false);
        formRef.current?.reset();
      }, 0);
    }
  }, [state.success]);

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

      <form ref={formRef} action={formAction} className="space-y-4">
        {/* Hidden published field - always true */}
        <input type="hidden" name="published" value="true" />

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Enter post title..."
            maxLength={200}
            required
            disabled={isPending}
          />
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content..."
            rows={6}
            className="w-full px-3 py-2 border border-input bg-background
              text-sm ring-offset-background placeholder:text-muted-foreground
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50 rounded-md
              resize-vertical"
            required
            disabled={isPending}
          />
        </div>

        {/* Error Message */}
        {state.error && (
          <div
            className="p-3 rounded-lg bg-destructive/10 text-destructive border
              border-destructive/20 text-sm">
            {state.error}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" disabled={isPending} size="lg">
            {isPending ? "Creating..." : "Create Post"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
