import QuizMakerForm from "@/app/ui/quiz-maker/quiz-maker-form";


export default function Page() {

  return (
    <div className="h-full ml-44 mt-10 flex flex-col items-center">
      <h1 className="text-2xl">Quiz Maker</h1>
      <QuizMakerForm />
    </div>
  )
}