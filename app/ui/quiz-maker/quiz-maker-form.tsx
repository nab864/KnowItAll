"use client";
import { useState } from "react";
import QuestionForm from "./question-form";
import { QuizDef } from "@/app/lib/definitions";
import { saveCreatedQuiz, updateQuiz } from "@/app/lib/actions";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function QuizMakerForm({
  session,
  quiz,
}: {
  session: Session | null;
  quiz?: QuizDef;
}) {
  const router = useRouter();
  const [quizAmount, setQuizAmount] = quiz
    ? useState(quiz.questions.length)
    : useState(5);
  const [quizState, setQuiz] = quiz
    ? useState<QuizDef>(quiz)
    : useState<QuizDef>({
        category: "General Knowledge",
        questions: Array(quizAmount).fill({
          category: "General Knowledge",
          difficulty: "easy",
          question: "",
          correctAnswer: "",
          incorrectAnswers: ["", "", ""],
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
      const updatedQuestions = [...quizState.questions];
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

  const handleCategoryChange = (category: string) => {
    setQuiz({
      category: category,
      questions: quizState.questions.map((question) => {
        question.category = category;
        return question;
      }),
    });
  };

  const handleAmountChange = (direction: string) => {
    if (direction === "up") {
      setQuizAmount(quizAmount + 1);
      setQuiz(
        (prevData) =>
          ({
            ...prevData,
            questions: [
              ...prevData.questions,
              {
                category: "General Knowledge",
                difficulty: "easy",
                question: "",
                correctAnswer: "",
                inCorrectAnswers: Array(3).fill(""),
                tags: Array(3).fill(""),
                type: "Multiple Choice",
              },
            ],
          } as QuizDef)
      );
    } else {
      setQuizAmount(quizAmount - 1);
      setQuiz(
        (prevData) =>
          ({
            ...prevData,
            questions: prevData.questions.filter((value, index) => {
              if (index < quizAmount - 1) {
                return value;
              }
            }),
          } as QuizDef)
      );
    }
  };

  const handleSaveQuiz = async () => {
    if (quiz) {
      await updateQuiz(quizState, session as Session);
      router.back()
    } else {
      await saveCreatedQuiz(quizState, session as Session);
    }
  };

  return (
    <div>
      <form>
        <select
          name="category"
          id="category"
          className="text-black p-1 mb-4"
          onChange={(e) => handleCategoryChange(e.target.value)}
          defaultValue={quizState.category}
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
        {quizState.questions.map((question, index) => {
          return (
            <QuestionForm
              index={index}
              question={quizState.questions[index]}
              handleQuestionChange={handleQuestionChange}
            />
          );
        })}
      </form>
      <div className="flex justify-center">
        <button
          className="border border-black rounded-lg bg-component hover:bg-select p-1 transition-colors disabled:bg-gray-400"
          onClick={() => handleAmountChange("up")}
          disabled={quizAmount === 15}
        >
          Add Question
        </button>
        <button
          className="border border-black rounded-lg bg-component hover:bg-select p-1 transition-colors disabled:bg-gray-400"
          onClick={() => handleAmountChange("down")}
          disabled={quizAmount === 5}
        >
          Remove Question
        </button>
      </div>
      <button
        className="border border-black rounded-lg bg-component hover:bg-select p-1 transition-colors disabled:bg-gray-400"
        onClick={() => handleSaveQuiz()}
      >
        Save Quiz
      </button>
      {quiz ? (
        <button
          className="border border-black rounded-lg bg-component hover:bg-select p-1 transition-colors disabled:bg-gray-400"
          onClick={() => setQuiz(quiz)}
        >
          Reset Changes
        </button>
      ) : null}
    </div>
  );
}
