//component
/**
 * PostCardSkeleton component for displaying loading state of post card.
 */
export const PostCardSkeleton = () => {
  //return
  return (
    <article
      className="border border-border rounded-lg p-6 bg-card animate-pulse">
      {/* Post Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-2/3 bg-muted rounded" />
        <div className="h-5 w-20 bg-muted rounded-full" />
      </div>

      {/* Post Content Skeleton */}
      <div className="mb-4 space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>

      {/* Post Footer Skeleton */}
      <div className="flex items-center justify-between text-sm">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-4 w-32 bg-muted rounded" />
      </div>
    </article>
  );
};
