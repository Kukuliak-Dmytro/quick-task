export const PostCardSkeleton = () => {
  return (
    <article
      className="border border-border rounded-lg p-6 bg-card animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-7 bg-muted rounded-md w-2/3"></div>
        <div className="h-6 bg-muted rounded-full w-20"></div>
      </div>

      {/* Content (mimics accordion preview) */}
      <div className="mb-4 space-y-2">
        <div className="h-4 bg-muted rounded-md w-full"></div>
        <div className="h-4 bg-muted rounded-md w-5/6"></div>
        <div className="h-4 bg-muted rounded-md w-4/6"></div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between text-sm
          text-muted-foreground">
        <div className="h-4 bg-muted rounded-md w-28"></div>
        <div className="h-4 bg-muted rounded-md w-36"></div>
      </div>
    </article>
  );
};
