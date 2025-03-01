"use client";
import { FormEvent, useState } from "react";
import type { QuizAnswers, QuizDef } from "@/app/lib/definitions";
import { Question } from "./question";
import { Button } from "../buttons";

export default function Quiz({ id, quiz }: { id: string; quiz: QuizDef }) {
  const [selectedAnswers, setSelectedAnswers] = useState<QuizAnswers>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let count = 0
    for (let i=0; i<quiz.questions.length; i++) {
      if (quiz.questions[i].correctAnswer === selectedAnswers[quiz.questions[i].id]) {
        count += 1
      }
      console.log(quiz.questions[i].correctAnswer)
      console.log(selectedAnswers[quiz.questions[i].id])
    }
    console.log(count)
  }
  return (
    <form
      className="flex flex-col items-center justify-center w-3/5"
      key={id}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1>{quiz.category}</h1>
      {quiz.questions.map((question) => {
        return (
          <Question
            question={question}
            setSelectedAnswers={setSelectedAnswers}
            selectedAnswer={selectedAnswers[question.id]}
          />
        );
      })}
      <Button type="submit" children="Submit Quiz" />
    </form>
  );
}
