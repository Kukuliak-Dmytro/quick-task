"use client";

import { IPost } from "@/app/entities/models";
import { Link } from "@/pkg/libraries/locale";

/**
 * Props interface for the PostCard component.
 *
 * @interface IPostCardProps
 */
interface IPostCardProps {
  /** The post object to display */
  post: IPost;
}

/**
 * PostCard component for displaying a single post preview.
 *
 * This component renders a post card with a truncated preview of the content.
 * The component includes post metadata such as author, date, and publication status.
 *
 * @param props - The component props
 * @param props.post - The post object containing all post data and metadata
 * @returns JSX element representing the post card
 */
export const PostCard = ({ post }: IPostCardProps) => {
  // Format date to readable string
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const truncatedContent =
    post.content.length > 150
      ? `${post.content.substring(0, 150)}...`
      : post.content;

  return (
    <article
      className="border border-border rounded-lg p-6 bg-card hover:shadow-lg
        transition-shadow duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">
          <Link className="hover:underline" href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </h2>
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

      {/* Post Content Preview */}
      <div className="mb-4">
        <div className="text-muted-foreground">
          <p className="line-clamp-3">{truncatedContent}</p>
        </div>
      </div>

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
