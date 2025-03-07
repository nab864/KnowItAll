"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma";
import { AuthError } from "next-auth";
import { shuffleQuestions } from "./utils";
import { Question } from "@prisma/client";

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
  return {
    category: category,
    questions: randomizeQuestions.slice(0, number),
  };
}
