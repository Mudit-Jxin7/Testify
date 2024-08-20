import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPage() {
  return (
    <div className="space-y-6 p-4">
      <Skeleton className="bg-slate-300 h-8 w-full" />

      <Skeleton className="bg-slate-300 h-[300px] w-full rounded-xl" />

      <div className="space-y-6">
        <Skeleton className="bg-slate-300 h-6 w-3/4" />
        <Skeleton className="bg-slate-300 h-6 w-2/3" />
        <Skeleton className="bg-slate-300 h-6 w-1/2" />
        <Skeleton className="bg-slate-300 h-6 w-1/4" />
      </div>

      <div className="space-y-3">
        <Skeleton className="bg-slate-300 h-4 w-1/2" />
        <Skeleton className="bg-slate-300 h-[125px] w-full rounded-xl" />
      </div>

      <div className="flex space-x-4">
        <Skeleton className="bg-slate-300 h-[150px] w-[150px] rounded-xl" />
        <Skeleton className="bg-slate-300 h-[150px] w-[150px] rounded-xl" />
        <Skeleton className="bg-slate-300 h-[150px] w-[150px] rounded-xl" />
      </div>

      <div className="space-y-2">
        <Skeleton className="bg-slate-300 h-4 w-full" />
        <Skeleton className="bg-slate-300 h-4 w-3/4" />
        <Skeleton className="bg-slate-300 h-4 w-1/2" />
      </div>
    </div>
  );
}
