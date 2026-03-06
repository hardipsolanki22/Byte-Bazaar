import { Skeleton } from "../ui/skeleton";

export function OrderDetailSkeleton() {
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
                    <div className="space-y-6">

                        {/* Section title */}
                        <Skeleton className="h-5 w-[150px] rounded-full" />

                        {/* Order ID */}
                        <Skeleton className="h-3.5 w-[260px] rounded-full" />

                        {/* Product card */}
                        <div className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-start gap-4">
                                <Skeleton className="w-[90px] h-[75px] shrink-0 rounded-lg" />
                                <div className="space-y-2.5 flex-1">
                                    <Skeleton className="h-4 w-3/4 rounded-full" />
                                    <Skeleton className="h-3.5 w-[90px] rounded-full" />
                                    <Skeleton className="h-3.5 w-[80px] rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* ── Order Status block ── */}
                        <div className="space-y-3 pt-2">
                            {/* Status icon + label + date */}
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-4 w-[100px] rounded-full" />
                                    <Skeleton className="h-3 w-[80px] rounded-full" />
                                </div>
                            </div>

                            {/* Status message banner */}
                            <Skeleton className="h-12 w-full sm:w-[340px] rounded-xl" />
                        </div>

                        {/* ── Delivered Location ── */}
                        <div className="space-y-2.5 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2 pt-4">
                                <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-[150px] rounded-full" />
                            </div>
                            <Skeleton className="h-3.5 w-[280px] rounded-full" />
                        </div>

                    </div>

                    {/* ══════════════════════════════════════
              RIGHT — Payment & Order Details
          ══════════════════════════════════════ */}
                    <div className="border border-gray-100 rounded-xl p-6 h-fit space-y-5">

                        {/* Section title */}
                        <Skeleton className="h-5 w-[200px] rounded-full" />

                        <div className="border-t border-gray-100 pt-4 space-y-4">
                            {/* Payment Status */}
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3.5 w-[120px] rounded-full" />
                                <Skeleton className="h-3.5 w-[60px] rounded-full" />
                            </div>

                            {/* Payment Method */}
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3.5 w-[130px] rounded-full" />
                                <Skeleton className="h-3.5 w-[40px] rounded-full" />
                            </div>

                            {/* Order Price */}
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3.5 w-[90px] rounded-full" />
                                <Skeleton className="h-3.5 w-[55px] rounded-full" />
                            </div>

                            {/* Cart Total */}
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3.5 w-[80px] rounded-full" />
                                <Skeleton className="h-3.5 w-[55px] rounded-full" />
                            </div>

                            {/* Discount Applied */}
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3.5 w-[120px] rounded-full" />
                                <Skeleton className="h-3.5 w-[30px] rounded-full" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}