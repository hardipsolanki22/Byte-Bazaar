import { Skeleton } from "../ui/skeleton";

export function AccountPageSkeleton() {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* ── Account Details Card ── */}
                <div className="border border-gray-100 rounded-2xl overflow-hidden">

                    {/* Card Header */}
                    <div className="flex flex-col items-center gap-2 py-8 border-b border-gray-100">
                        <Skeleton className="h-5 w-[160px] rounded-full" />
                        <Skeleton className="h-3.5 w-[220px] rounded-full" />
                    </div>

                    {/* Card Body */}
                    <div className="relative p-8">

                        {/* Edit icon — top right */}
                        <div className="absolute top-6 right-6">
                            <Skeleton className="h-7 w-7 rounded-full" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

                            {/* Avatar */}
                            <Skeleton className="w-[120px] h-[120px] rounded-full shrink-0" />

                            {/* User details */}
                            <div className="space-y-4 text-center sm:text-left pt-2">
                                {/* Full Name */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2">
                                    <Skeleton className="h-3.5 w-[80px] rounded-full" />
                                    <Skeleton className="h-3.5 w-[140px] rounded-full" />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2">
                                    <Skeleton className="h-3.5 w-[50px] rounded-full" />
                                    <Skeleton className="h-3.5 w-[200px] rounded-full" />
                                </div>

                                {/* Phone Number */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2">
                                    <Skeleton className="h-3.5 w-[105px] rounded-full" />
                                    <Skeleton className="h-3.5 w-[120px] rounded-full" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}