import Pagination from "@/app/ui/browse/pagination";
import Search from "@/app/ui/search";
import { BrowseTableSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center mt-10">
      <Search placeholder="Seach category..." />
      <BrowseTableSkeleton />
      <Pagination totalPages={1} />
    </div>
  );
}
