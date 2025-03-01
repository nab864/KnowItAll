"use client";
import { FormEvent, useState } from "react";
import type { QuizAnswers, QuizDef } from "@/app/lib/definitions";
import { Question } from "./question";
import { Button } from "../buttons";
import { QuizSummary } from "./quiz-summary";

export default function Quiz({ id, quiz }: { id: string; quiz: QuizDef }) {
  const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswers>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.scrollTo(0,0)
    for (let i = 0; i < quiz.questions.length; i++) {
      if (
        quiz.questions[i].correctAnswer ===
        selectedAnswers[quiz.questions[i].id]
      ) {
        setCorrectCount((prevCount) => prevCount + 1);
      }
    }
    setQuizFinished(true);
  };

  const handleRestart = () => {
    setQuizFinished(false);
  };
  return (
    <form
      className="flex flex-col items-center justify-center w-3/5"
      key={id}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1>{quiz.category}</h1>
      {quizFinished ? (<QuizSummary correctTotal={correctCount} questionCount={quiz.questions.length} />) : null}
      {quiz.questions.map((question) => {
        return (
          <Question
            question={question}
            setSelectedAnswers={setSelectedAnswers}
            selectedAnswer={selectedAnswers[question.id]}
            quizFinished={quizFinished}
          />
        );
      })}
      <Button
        type="submit"
        children="Submit Quiz"
        className="bg-component rounded-lg p-1 hover:bg-select transition-colors"
      />
    </form>
  );
}
