"use client";

import { useQuery } from "@tanstack/react-query";
import { postByIdQueryOptions } from "@/app/entities/api";
import { PostFullCard } from "../post-full-card/post-full-card.component";

interface IPostDetailsProps {
  postId: string;
}

export const PostDetails = ({ postId }: IPostDetailsProps) => {
  const { data, status, error } = useQuery(postByIdQueryOptions(postId));

  if (status === "pending")
    return (
      <div className="border border-border rounded-lg p-6 bg-card animate-pulse">
        <div className="h-8 w-2/3 bg-muted mb-4 rounded" />
        <div className="h-4 w-1/3 bg-muted mb-6 rounded" />
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    );
  if (status === "error")
    return <div>{error instanceof Error ? error.message : "Error"}</div>;

  return <PostFullCard post={data} />;
};

export default PostDetails;
