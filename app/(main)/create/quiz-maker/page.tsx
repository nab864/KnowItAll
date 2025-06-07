import QuizMakerForm from "@/app/ui/quiz-maker/quiz-maker-form";
import { auth } from "@/auth";


export default async function Page() {
  const session = await auth()
  return (
    <div className="h-full ml-44 mt-10 flex flex-col items-center">
      <h1 className="text-2xl">Quiz Maker</h1>
      <QuizMakerForm session={session}/>
    </div>
  )
}