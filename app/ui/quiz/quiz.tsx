"use client";
import { FormEvent, useState } from "react";
import type { QuizAnswers, QuizDef } from "@/app/lib/definitions";
import { QuestionProp } from "./question";
import { Button } from "../buttons";
import { QuizSummary } from "./quiz-summary";

export default function Quiz({ id, quiz }: { id: string; quiz: QuizDef }) {
  const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswers>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!quizFinished) {
      for (let i = 0; i < quiz.questions.length; i++) {
        if (
          quiz.questions[i].correctAnswer ===
          selectedAnswers[quiz.questions[i].id]
        ) {
          setCorrectCount((prevCount) => prevCount + 1);
        }
      }
      setQuizFinished(true);
    } else {
      setQuizFinished(false)
      setCorrectCount(0)
      setSelectedAnswers({})
    }
    
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-3/5"
      key={id}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1>{quiz.category}</h1>
      {quizFinished && quiz.questions ? (
        <QuizSummary
          correctTotal={correctCount}
          questionCount={quiz.questions.length}
        />
      ) : null}
      {quiz.questions?.map((question, index) => {
        return (
          <QuestionProp
            question={question}
            setSelectedAnswers={setSelectedAnswers}
            selectedAnswer={selectedAnswers[question.id]}
            quizFinished={quizFinished}
            key={index}
          />
        );
      })}
      <Button
        type="submit"
        className="bg-component rounded-lg p-1 hover:bg-select transition-colors"
      >{quizFinished ? "Reset Quiz" : "Submit Quiz"}</Button>
    </form>
  );
}
