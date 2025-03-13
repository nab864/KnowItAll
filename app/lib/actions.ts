"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma";
import { AuthError, Session } from "next-auth";
import { shuffleQuestions } from "./utils";
import { Question } from "@prisma/client";
import { QuizDef } from "./definitions";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData, { callbackURL: "" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function generateQuiz(category: string, number: number) {
  const allQuestions: Question[] = await prisma.question.findMany({
    where: {
      category: category,
    },
  });
  const randomizeQuestions = shuffleQuestions(allQuestions);
  const returnObject: QuizDef = {
    category: category,
    questions: randomizeQuestions.slice(0, number) as Question[],
  };
  return returnObject;
}

export async function saveGeneratedQuiz(quiz: QuizDef, session: Session) {
  try {
    const user = await prisma.user.findMany({
      where: {
        email: session.user?.email as string,
      },
    });
    const generatedQuiz = await prisma.quiz.create({
      data: {
        category: quiz.category,
        created_by: user[0].id,
      },
    });
    await prisma.q_junction.createMany({
      data: quiz.questions?.map((question) => {
        return {quiz_id: generatedQuiz.id, question_id:question.id}
      })
    })
    console.log("Success")
  } catch (error) {
    console.log(error)
  }
}
