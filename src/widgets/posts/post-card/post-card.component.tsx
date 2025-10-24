"use client";

import { IPost } from "@/shared/interfaces";

interface IPostCardProps {
  post: IPost;
}

/**
 * PostCard component for displaying a single post
 *
 * @param post - Post object to display
 * @returns PostCard component
 */
export const PostCard = ({ post }: IPostCardProps) => {
  // Format date to readable string
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className="border border-border rounded-lg p-6 bg-card hover:shadow-lg
        transition-shadow duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">{post.title}</h2>
        {post.published ? (
          <span
            className="px-3 py-1 text-xs font-medium rounded-full
              bg-green-500/10 text-green-600 border border-green-500/20">
            Published
          </span>
        ) : (
          <span
            className="px-3 py-1 text-xs font-medium rounded-full bg-muted
              text-muted-foreground border border-border">
            Draft
          </span>
        )}
      </div>

      {/* Post Content */}
      <p className="text-muted-foreground mb-4 line-clamp-3">{post.content}</p>

      {/* Post Footer */}
      <div
        className="flex items-center justify-between text-sm
          text-muted-foreground">
        <time dateTime={post.createdAt.toString()}>{formattedDate}</time>
        {post.author ? (
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
            <span className="text-xs">({post.author.email})</span>
          </div>
        ) : (
          <span>Unknown Author</span>
        )}
      </div>
    </article>
  );
};
