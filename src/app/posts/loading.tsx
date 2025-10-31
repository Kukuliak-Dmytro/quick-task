export default function LoadingPostsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="h-9 w-48 bg-muted rounded mb-6 animate-pulse" />
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-border rounded-lg p-6 bg-card
              animate-pulse">
            <div className="h-6 w-2/3 bg-muted mb-4 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
