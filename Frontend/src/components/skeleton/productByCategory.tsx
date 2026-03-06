import { Skeleton } from "../ui/skeleton";

export default function ProductByCategorySkeleton() {
  return (
    <div className="min-h-screen">     
      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full h-[220px] rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title — two lines like truncated long name */}
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />

        {/* Price */}
        <Skeleton className="h-5 w-[60px] rounded-full" />

        {/* Rating badge */}
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-7 w-[52px] rounded-full" />
          <Skeleton className="h-4 w-[70px] rounded-full" />
        </div>
      </div>
    </div>
  );
}