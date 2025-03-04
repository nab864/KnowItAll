import Button from "@/app/ui/navigation/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full ml-44 mt-10">
      <h1 className="text-4xl">Unleash Your Creativity!</h1>
      <div className="flex w-full justify-center mt-20">
        <div className="flex flex-col justify-center text-center w-1/2 mr-1">
          <h2 className="text-2xl mb-2">Ready to test your wits?</h2>
          <Link href="/create/quiz-maker">
            <div className="border border-black py-36 rounded-xl mb-2">Generate Quiz</div>
          </Link>
          <h4 className="text-xl">Whip up quizzes using our question pool.</h4>
        </div>
        <div className="flex flex-col justify-center text-center w-1/2 mx-3">
          <h2 className="text-2xl mb-2">Feeling creative?</h2>
          <Link href="/create/quiz-maker">
            <div className="border border-black py-36 rounded-xl mb-2">Create Quiz</div>
          </Link>
          <h4 className="text-xl">Craft your own questions and prove you know your stuff.</h4>
        </div>
      </div>
    </div>
  );
}
