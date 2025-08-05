import Pagination from "@/app/ui/browse/pagination";
import { BrowseTableSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center mt-10">
      <BrowseTableSkeleton />
      <Pagination totalPages={1} />
    </div>
  );
}
