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

export async function deleteQuiz(id: string) {
  try {
    await prisma.quiz.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete Quiz.");
  }
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
  } catch (error) {
    console.log(error)
  }
}

export async function saveCreatedQuiz(quiz: QuizDef, session: Session) {
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
    const generatedQuestions = await prisma.question.createManyAndReturn({
      data: quiz.questions
    })
    await prisma.q_junction.createMany({
      data: generatedQuestions.map((question) => {
        return {quiz_id: generatedQuiz.id, question_id: question.id}
      })
    })
  } catch (error) {
    console.log(quiz)
    console.log(session)
    console.log(error)
  }
}

export async function fetchRandomQuestion() {
  try {
    const questionCount = await prisma.question.count();
    const randomIndex = Math.floor(Math.random() * questionCount);
    const question = await prisma.question.findMany({
      take: 1,
      skip: randomIndex,
    });
    return question[0]
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch random question.");
  }
}

export async function submitFirstName(email: string | undefined, firstName:string | null | undefined) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        first_name: firstName
      }
    })
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}

export async function submitLastName(email: string | undefined, lastName:string | null | undefined) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        last_name: lastName
      }
    })
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}

export async function submitUserName(email: string | undefined, userName:string | null | undefined) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        username: userName
      }
    })
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}

export async function submitEmail(email: string | undefined, newEmail:string | null | undefined) {
  try {
    if (!newEmail) {
      throw new Error("New email must be provided.");
    }
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        email: newEmail
      }
    })
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}