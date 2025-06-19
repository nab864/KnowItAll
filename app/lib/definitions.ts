import { Question } from "@prisma/client";
import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 6 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState =
  | {
      errors: {
        username?: string[] | undefined;
        email?: string[] | undefined;
        firstname?: string[] | undefined;
        lastname?: string[] | undefined;
        password?: string[] | undefined;
    };
    message?: undefined;
} | {
    message: string;
    errors?: undefined;
} | undefined

export type QuizDef = {
  id?: string;
  created_by?: string;
  category: string;
  questions: Question[];
};

export type TempQuiz = {
  category?: string;
  questions?: Question[];
};

export type QuizAnswers = {
  [questionId: string]: string;
};

export type QuestionProps = {
  question: Question;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuizAnswers>>;
  selectedAnswer: string;
  quizFinished: boolean;
};

export type SingleQuestionProps = {
  question: Question;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>;
  selectedAnswer: string;
};

export type SummaryProps = {
  correctTotal: number;
  questionCount: number;
};

export type UserData =
  | {
      email: string;
      first_name: string | null;
      last_name: string | null;
      username: string | null;
      password: string | null;
    }
  | undefined;
