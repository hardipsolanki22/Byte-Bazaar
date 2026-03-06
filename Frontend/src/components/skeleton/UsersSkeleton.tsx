import { Skeleton } from "../ui/skeleton";

export function AdminUsersSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center w-full">
        {/* Page content */}
        <div className="p-6">

          {/* Collapse toggle */}
          <Skeleton className="w-6 h-6 rounded-md mb-6" />

          {/* Table card */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">

            {/* Subtitle */}
            <div className="flex justify-center py-4 border-b border-gray-100">
              <Skeleton className="h-3.5 w-[200px] rounded-full" />
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[2fr_3fr_2fr_2fr] items-center bg-gray-50 px-6 py-4 gap-4">
              {["Name", "Email", "Phone No.", "Role"].map((_, i) => (
                <Skeleton key={i} className="h-3.5 rounded-full" style={{ width: i === 0 ? 50 : i === 1 ? 45 : i === 2 ? 75 : 40 }} />
              ))}
            </div>

            {/* Table rows */}
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[2fr_3fr_2fr_2fr] items-center px-6 py-5 gap-4">

                  {/* Name + Avatar */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-[110px] rounded-full" />
                  </div>

                  {/* Email */}
                  <Skeleton className="h-3.5 w-[170px] rounded-full" />

                  {/* Phone */}
                  <Skeleton className="h-3.5 w-[100px] rounded-full" />

                  {/* Role + Button */}
                  <div className="flex flex-col gap-2 items-start">
                    <Skeleton className="h-3.5 w-[45px] rounded-full" />
                    <Skeleton className="h-8 w-[140px] rounded-lg" />
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
    </div>
  );
}