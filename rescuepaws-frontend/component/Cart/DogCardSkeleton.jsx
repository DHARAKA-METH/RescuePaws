import {Skeleton} from "../ui/skeleton"


export default function DogCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <Skeleton className="h-32 w-full rounded-lg" /> {/* image */}
      <Skeleton className="h-4 w-3/4" /> {/* title */}
      <Skeleton className="h-3 w-1/2" /> {/* location */}
      <Skeleton className="h-3 w-full" /> {/* desc */}
      <Skeleton className="h-8 w-full rounded-md" /> {/* button */}
    </div>
  );
}