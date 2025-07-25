import { QuizDef } from "@/app/lib/definitions";
import Quiz from "../quiz/quiz";
import { Button } from "../buttons";
import { Session } from "next-auth";
import { saveGeneratedQuiz } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function GeneratedQuiz({
  quiz,
  fetchQuiz,
  session,
}: {
  quiz: QuizDef;
  fetchQuiz: () => Promise<void>;
  session: Session | null;
}) {
  const router = useRouter()
  const saveQuiz = async () => {
    await saveGeneratedQuiz(quiz, session as Session)
    router.push("/profile")
  }
  return (
    <div className="flex flex-col items-center mt-4 w-full">
      <div className="mb-4">
        <Button
          onClick={fetchQuiz}
          className="bg-component rounded-lg p-1 hover:bg-select transition-colors mr-2"
        >Regenerate Quiz</Button>
        {session ? (
          <Button
            className="bg-component rounded-lg p-1 hover:bg-select transition-colors"
            onClick={saveQuiz}
          >Save Quiz</Button>
        ) : null}
      </div>
      <Quiz id="temp" quiz={quiz} />
    </div>
  );
}
