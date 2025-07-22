"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma";
import { AuthError, Session } from "next-auth";
import { shuffleQuestions } from "./utils";
import { Question } from "@prisma/client";
import { FormState, QuizDef, SignupFormSchema } from "./definitions";
import bcrypt from "bcryptjs";

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

export async function signup(prevState: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { username, firstname, lastname, email, password } =
    validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
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
        id: id,
      },
    });
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
        return { quiz_id: generatedQuiz.id, question_id: question.id };
      }),
    });
  } catch (error) {
    console.log(error);
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
      data: quiz.questions.map((question) => {
        return { ...question, created_by: user[0].id };
      }),
    });
    await prisma.q_junction.createMany({
      data: generatedQuestions.map((question) => {
        return { quiz_id: generatedQuiz.id, question_id: question.id };
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateQuiz(quiz: QuizDef) {
  try {
    for (let i=0; i<quiz.questions.length; i++) {
      await prisma.question.update({
        where: {
          id: quiz.questions[i].id,
        },
        data: {
          category: quiz.questions[i].category,
          tags: quiz.questions[i].tags,
          difficulty: quiz.questions[i].difficulty,
          question: quiz.questions[i].question,
          correctAnswer: quiz.questions[i].correctAnswer,
          incorrectAnswers: quiz.questions[i].incorrectAnswers,
          type: quiz.questions[i].type,
        }
      })
    }
    await prisma.quiz.update({
      where: {
        id: quiz.id,
      },
      data: {
        category: quiz.category
      }
    })
  } catch (error) {
    console.log(error);
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
    return question[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch random question.");
  }
}

export async function submitFirstName(
  email: string | undefined,
  firstName: string | null | undefined
) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        first_name: firstName,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}

export async function submitLastName(
  email: string | undefined,
  lastName: string | null | undefined
) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        last_name: lastName,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}

export async function submitUserName(
  email: string | undefined,
  userName: string | null | undefined
) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        username: userName,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}

export async function submitEmail(
  email: string | undefined,
  newEmail: string | null | undefined
) {
  try {
    if (!newEmail) {
      throw new Error("New email must be provided.");
    }
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        email: newEmail,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit First Name.");
  }
}
