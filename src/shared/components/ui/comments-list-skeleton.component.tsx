import { CommentSkeleton } from "./comment-skeleton.component";

export const CommentsListSkeleton = () => {
  return (
    <div className="space-y-6 mb-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </div>
  );
};

