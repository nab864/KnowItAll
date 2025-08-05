import NavBar from "@/app/ui/navbar";
import { fetchRandomQuestion } from "@/app/lib/data";
import RandomQuiz from "@/app/ui/browse/browse-quiz";

export default async function Home() {
  const question = await fetchRandomQuestion();

  return (
    <div className="flex flex-col items-center text-center sm-mt-10">
      <h1 className="text-9xl">Know It All</h1>
      <h3 className="text-2xl">Welcome!</h3>
      <p>
        Dive into trivia, challenge your friends, and uncover weird facts along
        the way!
      </p>
      <p>Think you know it all? Prove it.</p>
      <NavBar />
      <RandomQuiz question={question} />
    </div>
  );
}
