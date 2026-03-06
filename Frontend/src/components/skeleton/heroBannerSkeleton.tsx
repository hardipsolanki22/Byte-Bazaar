import { Skeleton } from "../ui/skeleton";

export function BannerSkeleton() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Main banner */}
      <Skeleton className="w-full h-[180px] sm:h-[260px] md:h-[300px] lg:h-[380px] rounded-none" />

      {/* Left arrow */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Right arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}