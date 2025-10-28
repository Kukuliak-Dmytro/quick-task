/**
 * PostListSkeleton component for loading states.
 *
 * This component provides a skeleton loading state for the posts list,
 * displaying placeholder content while posts are being fetched from the server.
 * Uses shimmer effects to create a realistic loading experience.
 */
export const PostListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="h-8 bg-muted rounded-md w-32 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded-md w-24 mx-auto animate-pulse"></div>
      </div>

      {/* Create Post Form Skeleton */}
      <div className="mb-8 p-6 border border-border rounded-lg bg-card">
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded-md w-20 animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md animate-pulse"></div>
          <div className="h-24 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Posts Skeleton */}
      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-6 bg-card
              animate-pulse">
            {/* Post Header Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-muted rounded-md w-3/4"></div>
              <div className="h-6 bg-muted rounded-md w-20"></div>
            </div>

            {/* Post Content Skeleton */}
            <div className="mb-4 space-y-2">
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="h-4 bg-muted rounded-md w-5/6"></div>
              <div className="h-4 bg-muted rounded-md w-4/6"></div>
            </div>

            {/* Post Footer Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded-md w-24"></div>
              <div className="h-4 bg-muted rounded-md w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
