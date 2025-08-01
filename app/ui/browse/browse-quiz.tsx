"use client";
import { useEffect, useState } from "react";
import { Question } from "@prisma/client";
import { SingleQuestion } from "./browse-question";
import { fetchRandomQuestion } from "@/app/lib/actions";

export default function RandomQuiz({ question }: { question: Question }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [questionState, setQuestionState] = useState(question);
  const [streakCount, setStreakCount] = useState<number>(0);

  const fetchData = async () => {
    setQuestionState(await fetchRandomQuestion());
  };
  useEffect(() => {
    if (selectedAnswer === questionState.correctAnswer) {
      setStreakCount(streakCount + 1);
      setTimeout(() => fetchData(), 1500);
    } else if (
      selectedAnswer !== "" &&
      selectedAnswer !== questionState.correctAnswer
    ) {
      setStreakCount(0);
      setTimeout(() => fetchData(), 1500);
    }
  }, [selectedAnswer]);

  return (
    <div className="flex flex-col items-center justify-center w-3/5 mt-5">
      <h1 className="text-2xl font-bold mb-4">Streak: {streakCount}</h1>
      <SingleQuestion
        question={questionState}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
