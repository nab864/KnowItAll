import { PrismaClient } from "@prisma/client";
import { Quiz } from "./definitions";

const prisma = new PrismaClient();

const ITEMS_PER_PAGE = 10;

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

export async function createUser() {
  await prisma.user.create({
    data: {
      email: "kaifuller1885@gmail.com",
      isExternal:true
    }
  })
}

export async function fetchAllQuestions() {
  try {
    const questions = await prisma.question.findMany({});
    return questions;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch question data.");
  }
}


export async function fetchFilteredQuizzes(
  currentPage: number,
  query: string,
  tags: string[]
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // const capitalizedQuery = query ? query.charAt(0).toUpperCase + query.slice(1) : query

  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        category: {
          contains: query,
        },
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    const cleanedQuizzes: Quiz[] = [];
    for (let i = 0; i < quizzes.length; i++) {
      const rawQuiz = await prisma.q_junction.findMany({
        where: {
          quiz_id: quizzes[i].id,
        },
        include: {
          question: true,
          quiz: true,
        },
      });
      const cleanedQuiz = {
        id: quizzes[i].id,
        created_by: quizzes[i].created_by,
        category: quizzes[i].category,
        questions: rawQuiz.map((quiz) => quiz.question),
      };
      cleanedQuizzes.push(cleanedQuiz);
    }
    return cleanedQuizzes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch quizzes.");
  }
}

export async function fetchQuizPages(query: string) {
  try {
    const count = await prisma.quiz.count({
      where: {
        category: {
          contains: query,
        },
      },
    });

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}
