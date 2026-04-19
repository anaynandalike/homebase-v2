export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-sand animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-sand rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-sand rounded w-1/3" />
          <div className="h-3 bg-sand/60 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-sand/60 rounded w-full" />
        <div className="h-3 bg-sand/60 rounded w-2/3" />
      </div>
    </div>
  );
}
