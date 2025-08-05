"use client";
import { SingleQuestionProps } from "@/app/lib/definitions";
import { shuffleQuestions } from "@/app/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const SingleQuestion: React.FC<SingleQuestionProps> = ({
  question,
  setSelectedAnswer,
  selectedAnswer,
}) => {
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const unshuffledAnswer = [
      ...question.incorrectAnswers,
      question.correctAnswer,
    ];
    setAnswers(shuffleQuestions(unshuffledAnswer));
    setSelectedAnswer("");
  }, [question]);

  return (
    <div className="md:w-full">
      {answers[1] ? (
        <div
          className="bg-component w-[75%] rounded-lg text-center my-2"
          key={question.id}
        >
          <h1 className="select-none">{question.question}</h1>
          {answers.map((answer, index) => {
            return (
              <div
                key={index}
                className={clsx({
                  "hover:bg-select":
                    answer !== selectedAnswer && !selectedAnswer,
                  "bg-green-800":
                    selectedAnswer && answer === question.correctAnswer,
                  "bg-red-700":
                    answer === selectedAnswer &&
                    selectedAnswer !== question.correctAnswer,
                })}
              >
                <input
                  type="radio"
                  id={answer}
                  key={answer}
                  value={answer}
                  checked={answer === selectedAnswer}
                  disabled={!!selectedAnswer}
                  onChange={() => setSelectedAnswer(answer)}
                  className="hidden"
                />
                <label htmlFor={answer} className="select-none block">
                  {answer}
                </label>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
