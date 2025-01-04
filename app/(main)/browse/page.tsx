import { Suspense } from "react";
import BrowseTable from "@/app/ui/browse/table";
import { BrowseTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/browse/pagination";
import { fetchQuizPages } from "@/app/lib/data";
import Search from "@/app/ui/search";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchQuizPages(query);
  return (
    <div className="flex flex-col items-center">
      <h1>Browse Page</h1>
      <Search placeholder="Seach quizzes..." />
      <Suspense fallback={<BrowseTableSkeleton />}>
        <BrowseTable currentPage={currentPage} query={query}/>
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
