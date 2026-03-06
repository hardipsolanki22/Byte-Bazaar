import { Skeleton } from "../ui/skeleton";

export function CartPageSkeleton() {
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
              LEFT — Products Details
          ══════════════════════════════════════ */}
          <div className="space-y-4">
            {/* Section title */}
            <Skeleton className="h-5 w-[160px] rounded-full mb-6" />

            {/* Cart Items */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-4">

                {/* Top row — image + details + button */}
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <Skeleton className="w-[100px] h-[80px] shrink-0 rounded-lg" />

                  {/* Details */}
                  <div className="flex-1 space-y-2.5">
                    <Skeleton className="h-4 w-3/4 rounded-full" />
                    <Skeleton className="h-3.5 w-[90px] rounded-full" />
                    <Skeleton className="h-3.5 w-[140px] rounded-full" />
                    <Skeleton className="h-3.5 w-[80px] rounded-full" />
                  </div>

                  {/* Update Quantity button */}
                  <Skeleton className="h-9 w-[130px] shrink-0 rounded-lg self-start" />
                </div>

                {/* Remove button */}
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
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
                <Skeleton className="h-5 w-[70px] rounded-full" />
              </div>
            </div>

            {/* Coupon input + Apply */}
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-10 flex-1 rounded-lg" />
              <Skeleton className="h-10 w-[70px] rounded-lg" />
            </div>

            {/* Proceed to Checkout */}
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

        </div>
      </div>
    </div>
  );
}