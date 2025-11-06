//component
/**
 * CommentSkeleton component for displaying loading state.
 */
export const CommentSkeleton = () => {
  //return
  return (
    <div className="py-2 border-b border-border animate-pulse">
      <div className="h-4 w-24 bg-muted rounded mb-2"></div>
      <div className="h-4 w-full bg-muted rounded"></div>
    </div>
  );
};
