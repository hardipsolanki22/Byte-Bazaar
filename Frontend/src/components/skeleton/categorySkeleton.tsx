import { Skeleton } from "../ui/skeleton";

export function CategoryTabsSkeleton() {
  return (
    <div className="flex items-center justify-center gap-8 py-5 border-b border-gray-100">
      {[100, 80, 90, 110, 75].map((w, i) => (
        <Skeleton key={i} className="h-4 rounded-full" style={{ width: w }} />
      ))}
    </div>
  );
}