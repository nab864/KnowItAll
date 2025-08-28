import { fetchQuiz } from "@/app/lib/data"
import Quiz from "@/app/ui/quiz/quiz"
import type { QuizDef } from "@/app/lib/definitions"


export default async function Page(props: { params: Promise<{ id: string}> }) {
  const params = await props.params
  const id = params.id
  const quiz: QuizDef = await fetchQuiz(id)
  return (
    <div className="mt-11 sm:mt-2 mb-2 flex justify-center">
      <Quiz id={id} quiz={quiz}/>
    </div>
  )
}