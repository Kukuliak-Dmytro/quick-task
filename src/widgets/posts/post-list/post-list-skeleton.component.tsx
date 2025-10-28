/**
 * PostListSkeleton component for loading state.
 *
 * This component displays a skeleton loading state while posts are being fetched.
 * It shows placeholder cards that match the visual layout of actual post cards.
 *
 * @returns JSX element representing the loading skeleton
 */
export const PostListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="h-9 w-32 bg-muted rounded-lg mx-auto mb-2 animate-pulse" />
        <div className="h-5 w-24 bg-muted rounded mx-auto animate-pulse" />
      </div>

      {/* Create Post Button Skeleton */}
      <div className="mb-6 flex justify-center">
        <div className="h-11 w-40 bg-muted rounded-lg animate-pulse" />
      </div>

      {/* Post Cards Skeleton */}
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * PostCardSkeleton component for individual post loading state.
 *
 * This component displays a skeleton placeholder for a single post card
 * during loading. It matches the layout and dimensions of the actual PostCard.
 *
 * @returns JSX element representing a loading post card
 */
export const PostCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-6 bg-card animate-pulse">
      {/* Title skeleton */}
      <div className="h-7 bg-muted rounded w-3/4 mb-3" />

      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>

      {/* Author and date skeleton */}
      <div className="flex items-center gap-2 text-sm">
        <div className="h-4 bg-muted rounded w-24" />
        <div className="h-4 w-1 bg-muted rounded-full" />
        <div className="h-4 bg-muted rounded w-32" />
      </div>
    </div>
  );
};
