import { Skeleton } from "../ui/skeleton";

export function MyOrdersSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Title */}
        <Skeleton className="h-6 w-[120px] rounded-full mb-8" />

        {/* Order Cards */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-5 space-y-4">

              {/* Top row — Status + Total Items */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-[55px] rounded-full" />
                  <Skeleton className="h-3.5 w-[80px] rounded-full" />
                </div>
                <Skeleton className="h-3.5 w-[90px] rounded-full" />
              </div>

              {/* Product row — thumbnail + name */}
              <div className="flex items-center gap-4">
                <Skeleton className="w-[90px] h-[75px] shrink-0 rounded-lg" />
                <Skeleton className="h-4 w-full max-w-lg rounded-full" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}