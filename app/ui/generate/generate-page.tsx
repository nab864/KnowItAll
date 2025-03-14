"use client";
import { useState } from "react";
import GenerateForm from "./generate-quiz";
import { generateQuiz } from "@/app/lib/actions";
import { QuizDef } from "@/app/lib/definitions";
import GeneratedQuiz from "./generated-quiz";
import { Session } from "next-auth";

export default function GeneratePage({
  number,
  category,
  session,
}: {
  number: string;
  category: string;
  session: Session | null;
}) {
  const [quiz, setQuiz] = useState<QuizDef>();

  const fetchQuiz = async () => {
    setQuiz(await generateQuiz(category, Number(number)));
  };

  return (
    <>
      {quiz?.questions ? (
        <GeneratedQuiz quiz={quiz} fetchQuiz={fetchQuiz} session={session} />
      ) : (
        <GenerateForm fetchQuiz={fetchQuiz} />
      )}
    </>
  );
}
