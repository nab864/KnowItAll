import { fetchFilteredQuizzes } from "@/app/lib/data";
import PlayButton from "@/app/ui/browse/playButton";

export default async function BrowseTable({
  id,
  currentPage,
  query,
  tags
}: {
  id?: string;
  currentPage: number;
  query: string;
  tags: string[]
}) {
  const quizzes = await fetchFilteredQuizzes(currentPage, query, tags, id);
  return (
    <>
      <table className="rounded-xl min-w-30 bg-component">
        <thead className="text-left">
          <tr>
            <th scope="col" className="px-4 py-5">
              Category
            </th>
            <th scope="col" className="px-4 py-8">
              Number of Questions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {quizzes?.map((quiz) => (
            <tr
              key={quiz.id}
              className="w-full border-b-2  py-3 hover:bg-select last-of-type:border-none"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                {quiz.category}
              </td>
              <td className="px-3 py-3 text-center">{quiz.questions.length}</td>
              <td>
                <PlayButton id={quiz.id as string} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
