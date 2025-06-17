import UserInfo from "@/app/ui/profile/user_info";
import {
  fetchFilteredQuizzes,
  fetchQuizPages,
  fetchUserData,
} from "@/app/lib/data";
import { auth } from "@/auth";
import { Suspense } from "react";
import { BrowseTableSkeleton } from "@/app/ui/skeletons";
import BrowseTable from "@/app/ui/browse/table";
import Pagination from "@/app/ui/browse/pagination";

export default async function Profile(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
    tags?: string | string[];
  }>;
}) {
  const session = await auth();
  const userData = await fetchUserData(session?.user?.email);
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  let tags = searchParams?.tags || [];
  if (typeof tags === "string") {
    tags = [tags];
  }
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchQuizPages(query, userData?.id);
  const quizzes = await fetchFilteredQuizzes(
    currentPage,
    query,
    tags,
    userData?.id
  );

  return (
    <div className="my-2 flex flex-col items-center">
      <h1 className="text-4xl">Profile</h1>
      <UserInfo userData={userData} />
      <Suspense fallback={<BrowseTableSkeleton />}>
        <BrowseTable id={userData?.id} quizzes={quizzes} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
