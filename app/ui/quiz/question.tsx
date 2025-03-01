import { QuestionProps } from "@/app/lib/definitions";
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
      <div className="bg-gray-300" key={question.id}>
        <h1>{question.question}</h1>
        {answers.map((answer) => {
          return (
            <div>
              <input
                type="radio"
                key={answer}
                value={answer}
                checked={answer === selectedAnswer}
                onChange={() =>
                  setSelectedAnswers((prevAnswer) => ({
                    ...prevAnswer,
                    [question.id]: answer,
                  }))
                }
              />
              <span>{answer}</span>
            </div>
          );
        })}
      </div>

    ) : null}
    </>
  );
};
