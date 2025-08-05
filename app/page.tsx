import NavBar from "@/app/ui/navbar";
import { fetchRandomQuestion } from "@/app/lib/data";
import RandomQuiz from "@/app/ui/browse/browse-quiz";

export default async function Home() {
  const question = await fetchRandomQuestion();

  return (
    <div className="flex flex-col items-center text-center mx-1">
      <h1 className="text-6xl sm:text-9xl mt-11">Know It All</h1>
      <h3 className="text-2xl mt-10">Welcome!</h3>
      <p>
        Dive into trivia, challenge your friends, and uncover weird facts along
        the way!
      </p>
      <p className="mt-3">Think you know it all? Prove it.</p>
      <NavBar />
      <RandomQuiz question={question} />
    </div>
  );
}
