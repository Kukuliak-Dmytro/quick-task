export const CommentSkeleton = () => {
  return (
    <div className="border-b pb-4 last:border-b-0 animate-pulse">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full shrink-0"></div>

        {/* Content */}
        <div className="flex-1">
          {/* Header with name and date */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          </div>

          {/* Comment content lines */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
