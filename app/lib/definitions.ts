import { Question } from "@prisma/client";

export type QuizDef = {
  id?: string;
  created_by?: string;
  category: string;
  questions: Question[]
}

export type TempQuiz = {
  category?: string;
  questions?: Question[]
}

export type QuizAnswers = {
  [questionId: string]: string;
}

export type QuestionProps = {
  question: Question;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuizAnswers>>;
  selectedAnswer: string;
  quizFinished: boolean;
}

export type SummaryProps = {
  correctTotal: number;
  questionCount: number;
}