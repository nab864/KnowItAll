import { QuestionProps } from "@/app/lib/definitions";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Question: React.FC<QuestionProps> = ({
  question,
  setSelectedAnswers,
  selectedAnswer,
}) => {
  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => {
    const unshuffledAnswer = [
      ...question.incorrectAnswers,
      question.correctAnswer,
    ];
    setAnswers(unshuffledAnswer.sort(() => Math.random() - 0.5));
  }, [question.correctAnswer]);
  return (
    <>
      {answers[1] ? (
        <div
          className="bg-component w-[75%] rounded-lg text-center my-2"
          key={question.id}
        >
          <h1 className="select-none">{question.question}</h1>
          {answers.map((answer) => {
            return (
              <div className={clsx({"bg-main": answer === selectedAnswer, "hover:bg-select": answer !== selectedAnswer})}>
                <input
                  type="radio"
                  id={answer}
                  key={answer}
                  value={answer}
                  checked={answer === selectedAnswer}
                  onChange={() =>
                    setSelectedAnswers((prevAnswer) => ({
                      ...prevAnswer,
                      [question.id]: answer,
                    }))
                  }
                  className="hidden"
                />
                <label htmlFor={answer} className="select-none block">{answer}</label>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};
