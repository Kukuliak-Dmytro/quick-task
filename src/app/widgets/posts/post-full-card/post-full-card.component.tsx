"use client";

import { IPost } from "@/app/shared/interfaces";
import Link from "next/link";

interface IPostFullCardProps {
  post: IPost;
}

export const PostFullCard = ({ post }: IPostFullCardProps) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="border border-border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-foreground">
          <Link className="hover:underline" href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </h1>
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

      <div
        className="text-sm text-muted-foreground mb-6 flex items-center
          justify-between">
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

      <div
        className="text-base text-foreground whitespace-pre-wrap
          leading-relaxed">
        {post.content}
      </div>
    </article>
  );
};

export default PostFullCard;
