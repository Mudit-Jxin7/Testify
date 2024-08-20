import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="bg-slate-300 h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="bg-slate-300 h-4 w-[250px]" />
        <Skeleton className="bg-slate-300 h-4 w-[200px]" />
      </div>
    </div>
  );
}
