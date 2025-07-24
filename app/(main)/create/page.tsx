import Link from "next/link";
import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full ml-44 mt-10">
      <h1 className="text-4xl">Unleash Your Creativity!</h1>
      <div className="flex w-full justify-center mt-20">
        <div className="flex flex-col justify-center text-center w-1/2 mr-1">
          <h2 className="text-2xl mb-2">Ready to test your wits?</h2>
          <Link href="/create/generate">
            <div className="border border-black rounded-xl mb-2 flex flex-col items-center py-12 hover:bg-select transition-colors">
              <Cog8ToothIcon className="w-48 mb-4"/>
              <h1>Generate Quiz</h1>
            </div>
          </Link>
          <h4 className="text-xl">Whip up quizzes using our question pool.</h4>
        </div>
        <div className="flex flex-col justify-center text-center w-1/2 mx-3">
          <h2 className="text-2xl mb-2">Feeling creative?</h2>
          <Link href="/create/quiz-maker">
            <div className="border border-black rounded-xl mb-2 flex flex-col items-center py-12 hover:bg-select transition-colors">
              <PencilIcon className="w-48 mb-4"/>
              <h1>Generate Quiz</h1>
            </div>
          </Link>
          <h4 className="text-xl">
            Craft your own questions and prove you know your stuff.
          </h4>
        </div>
      </div>
    </div>
  );
}
