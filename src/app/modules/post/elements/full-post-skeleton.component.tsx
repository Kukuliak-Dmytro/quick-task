//component
/**
 * FullPostSkeleton component for displaying loading state of full post.
 */
export const FullPostSkeleton = () => {
  //return
  return (
    <div className="border border-border rounded-lg p-6 bg-card animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-2/3 bg-muted rounded" />
        <div className="h-6 w-20 bg-muted rounded-full" />
      </div>
      <div className="h-4 w-1/3 bg-muted mb-6 rounded" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>
    </div>
  );
};
