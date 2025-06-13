import { fetchQuiz } from "@/app/lib/data"
import type { QuizDef } from "@/app/lib/definitions"
import QuizMakerForm from "@/app/ui/quiz-maker/quiz-maker-form"
import { auth } from "@/auth"


export default async function Page(props: { params: Promise<{ id: string}> }) {
  const session = await auth()
  const params = await props.params
  const id = params.id
  const quiz: QuizDef = await fetchQuiz(id)
  return (
    <div className="my-2 flex justify-center">
      <QuizMakerForm session={session} quiz={quiz}/>
    </div>
  )
}