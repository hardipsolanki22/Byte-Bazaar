import { Skeleton } from "../ui/skeleton";

export function SingleProductSkeleton() {
  return (
    <div className="min-h-screen">

      {/* ── Category Tabs ── */}
      <div className="flex items-center justify-center gap-8 py-4 border-b border-gray-100">
        {[90, 80, 70].map((w, i) => (
          <Skeleton key={i} className="h-3.5 rounded-full" style={{ width: w }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ══════════════════════════════════════
            TOP SECTION — Image + Details
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

          {/* ── Left: Image Gallery ── */}
          <div className="flex gap-3">
            {/* Thumbnail strip */}
            <div className="hidden sm:flex flex-col gap-2 shrink-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-14 h-14 rounded-lg" />
              ))}
            </div>

            {/* Main image */}
            <Skeleton className="w-full aspect-[4/3] rounded-xl" />
          </div>

          {/* ── Right: Product Info ── */}
          <div className="space-y-4">
            {/* Title */}
            <Skeleton className="h-6 w-3/4 rounded-full" />

            {/* Description */}
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded-full" />

            {/* Price */}
            <Skeleton className="h-7 w-[80px] rounded-full mt-2" />

            {/* Badge row — Out of Stock + Rating */}
            <div className="flex items-center gap-3 pt-1">
              <Skeleton className="h-6 w-[90px] rounded-md" />
              <Skeleton className="h-6 w-[100px] rounded-full" />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {/* Add to Cart + Buy Now buttons */}
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RATINGS & REVIEWS SECTION
        ══════════════════════════════════════ */}
        <div className="mt-12 border border-gray-100 rounded-xl p-6 space-y-6">
          {/* Section title */}
          <Skeleton className="h-5 w-[220px] rounded-full" />

          {/* Rating summary row */}
          <div className="flex flex-col sm:flex-row gap-8">

            {/* Big rating number */}
            <div className="flex flex-col items-center justify-center gap-2 shrink-0">
              <Skeleton className="h-14 w-14 rounded-full" />
              <Skeleton className="h-3 w-[70px] rounded-full" />
              <Skeleton className="h-3 w-[60px] rounded-full" />
            </div>

            {/* Rating bars */}
            <div className="flex-1 space-y-2.5">
              {["Excellent", "Good", "Average", "Poor", "Terrible"].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <Skeleton className="h-3 w-[60px] rounded-full shrink-0" />
                  <Skeleton className="h-2.5 flex-1 rounded-full" />
                  <Skeleton className="h-3 w-[28px] rounded-full shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Individual reviews */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-3 pb-4 border-b border-gray-50 last:border-0">
              {/* Reviewer row */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-[120px] rounded-full" />
                  <Skeleton className="h-3 w-[80px] rounded-full" />
                </div>
              </div>
              {/* Rating badge + date */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-[44px] rounded-full" />
                <Skeleton className="h-3 w-[70px] rounded-full" />
              </div>
              {/* Review text */}
              <Skeleton className="h-3.5 w-full rounded-full" />
              <Skeleton className="h-3.5 w-4/5 rounded-full" />
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════
            YOU MAY ALSO LIKE
        ══════════════════════════════════════ */}
        <div className="mt-12 space-y-4">
          {/* Section heading */}
          <Skeleton className="h-5 w-[160px] rounded-full" />

          {/* Horizontal scroll row */}
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[200px] sm:w-[240px] border border-gray-100 rounded-xl overflow-hidden"
              >
                <Skeleton className="w-full h-[150px] rounded-none" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-3.5 w-full rounded-full" />
                  <Skeleton className="h-3.5 w-3/4 rounded-full" />
                  <Skeleton className="h-4 w-[50px] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}