export default function LoadingPostPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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
      <div className="mt-8 space-y-4">
        <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        <div
          className="border border-border rounded-lg p-4 bg-card animate-pulse">
          <div className="h-4 bg-muted rounded mb-2" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
