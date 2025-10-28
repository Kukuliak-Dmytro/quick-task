import { PostCardSkeleton } from "@/widgets/post-card";

export const PostListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Skeleton */}
      <div className="mb-8 text-center">
        <div className="h-9 bg-muted rounded-md w-32 mx-auto mb-2 animate-pulse"></div>
        <div className="h-5 bg-muted rounded-md w-28 mx-auto animate-pulse"></div>
      </div>

      {/* Create Post Button Skeleton */}
      <div className="mb-6 flex justify-center">
        <div className="h-11 bg-muted rounded-md w-40 animate-pulse"></div>
      </div>

      {/* Posts List Skeleton */}
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
