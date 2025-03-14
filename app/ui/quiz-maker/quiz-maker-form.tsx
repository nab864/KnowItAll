"use client";
import { useState } from "react";
import QuestionForm from "./question-form";

export default function QuizMakerForm() {
  const [quizAmount, setQuizAmount] = useState(5);
  const [quiz, setQuiz] = useState({
    category: "",
    questions: Array(quizAmount).fill({
      category: "",
      difficulty: "",
      question: "",
      correctAnswer: "",
      incorrectAnswers: Array(3).fill(""),
      tags: Array(3).fill(""),
      type: "Multiple Choice",
    }),
  });

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setQuiz((prevData) => {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };
  return (
    <div>
      <form action="">
        <select
          name="category"
          id="category"
          className="text-black p-1 mb-4"
          onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
        >
          <option value="General Knowledge">General Knowledge</option>
          <option value="Geography">Geography</option>
          <option value="Society & Culture">Society & Culture</option>
          <option value="Music">Music</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Sport & Leisure">Sport & Leisure</option>
          <option value="Film & TV">Film & TV</option>
          <option value="Science">Science</option>
          <option value="Arts & Literature">Arts & Literature</option>
          <option value="History">History</option>
        </select>
        {[...Array(quizAmount)].map((value, index) => {
          return <QuestionForm index={index} handleQuestionChange={handleQuestionChange}/>;
        })}
      </form>
      <div className="flex justify-center">
        <button
          className="border border-black rounded-lg bg-component hover:bg-select p-1 transition-colors disabled:bg-gray-400"
          onClick={() => setQuizAmount(quizAmount + 1)}
          disabled={quizAmount === 15}
        >
          Add Question
        </button>
        <button
          className="border border-black rounded-lg bg-component hover:bg-select p-1 transition-colors disabled:bg-gray-400"
          onClick={() => setQuizAmount(quizAmount - 1)}
          disabled={quizAmount === 5}
        >
          Remove Question
        </button>
      </div>
    </div>
  );
}
