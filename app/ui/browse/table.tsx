import { fetchFilteredQuizzes } from "@/app/lib/data";
import PlayButton from "@/app/ui/browse/playButton";

export default async function BrowseTable({
  currentPage,
  query
}: {
  currentPage: number;
  query: string;
}) {
  const quizzes = await fetchFilteredQuizzes(currentPage, query);
  return (
    <>
      <table className="border rounded-xl min-w-30">
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
              className="w-full border-b-2 border-gray-300 py-3 hover:bg-gray-100 last-of-type:border-none"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                {quiz.category}
              </td>
              <td className="px-3 py-3 text-center">{quiz.questions.length}</td>
              <td>
                <PlayButton id={quiz.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
