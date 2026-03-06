import { Skeleton } from "../ui/skeleton";

export function AddressPageSkeleton() {
  return (
    <div className="min-h-screen">

      {/* ── Category Tabs ── */}
      <div className="flex items-center justify-center gap-8 py-4 border-b border-gray-100">
        {[90, 80, 70].map((w, i) => (
          <Skeleton key={i} className="h-3.5 rounded-full" style={{ width: w }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* ══════════════════════════════════════
              LEFT — Address List
          ══════════════════════════════════════ */}
          <div>
            {/* Header row — title + Add New Address button */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-5 w-[200px] rounded-full" />
              <Skeleton className="h-10 w-[150px] rounded-lg" />
            </div>

            {/* Address Cards */}
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-xl px-5 py-4 space-y-2">
                  <Skeleton className="h-4 w-[140px] rounded-full" />
                  <Skeleton className="h-3.5 w-[240px] rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT — Price Details
          ══════════════════════════════════════ */}
          <div className="border border-gray-100 rounded-xl p-6 h-fit space-y-5">
            {/* Section title */}
            <Skeleton className="h-5 w-[130px] rounded-full" />

            <div className="border-t border-gray-100 pt-4 space-y-4">
              {/* Total Products Price */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-[150px] rounded-full" />
                <Skeleton className="h-3.5 w-[60px] rounded-full" />
              </div>

              {/* Total Discount */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-[110px] rounded-full" />
                <Skeleton className="h-3.5 w-[30px] rounded-full" />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              {/* Total Price */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[90px] rounded-full" />
                <Skeleton className="h-5 w-[60px] rounded-full" />
              </div>
            </div>

            {/* Continue button */}
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

        </div>
      </div>
    </div>
  );
}