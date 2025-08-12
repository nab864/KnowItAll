import { QuestionProps } from "@/app/lib/definitions";
import { shuffleQuestions } from "@/app/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const QuestionProp: React.FC<QuestionProps> = ({
  question,
  setSelectedAnswers,
  selectedAnswer,
  quizFinished,
}) => {
  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => {
    const unshuffledAnswer = [
      ...question.incorrectAnswers,
      question.correctAnswer,
    ];
    setAnswers(shuffleQuestions(unshuffledAnswer));
  }, [question.correctAnswer]);
  return (
    <>
      {answers[1] ? (
        <div
          className="bg-component w-full sm:w-[75%] rounded-lg text-center my-2"
          key={question.id}
        >
          <h1 className="select-none">{question.question}</h1>
          {answers.map((answer, index) => {
            return (
              <div
                key={index}
                className={clsx({
                  "bg-main": answer === selectedAnswer && !quizFinished,
                  "hover:bg-select": answer !== selectedAnswer && !quizFinished,
                  "bg-green-800":
                    answer === question.correctAnswer && quizFinished,
                  "bg-red-700":
                    answer === selectedAnswer &&
                    quizFinished &&
                    selectedAnswer !== question.correctAnswer,
                })}
              >
                <input
                  type="radio"
                  id={answer}
                  key={answer}
                  value={answer}
                  checked={answer === selectedAnswer}
                  disabled={quizFinished}
                  onChange={() =>
                    setSelectedAnswers((prevAnswer) => ({
                      ...prevAnswer,
                      [question.id]: answer,
                    }))
                  }
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
    </>
  );
};
