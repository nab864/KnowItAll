import { PrismaClient } from "@prisma/client";
import { QuizDef } from "./definitions";

const prisma = new PrismaClient();

const ITEMS_PER_PAGE = 10;

export async function fetchUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function createUser(email: string) {
  await prisma.user.create({
    data: {
      email: email,
    },
  });
}

export async function fetchUserData(email: string | undefined | null) {
  if (email) {
    const userData = await prisma.user.findMany({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        username: true,
        password: true,
      },
    });
    return userData[0];
  }
}

export async function updateFirstName(email: string, firstName: string) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      first_name: firstName,
    },
  });
}

export async function updateLastName(email: string, lastName: string) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      last_name: lastName,
    },
  });
}

export async function updateUsername(email: string, username: string) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      username: username,
    },
  });
}

export async function updateEmail(currentEmail: string, newEmail: string) {
  await prisma.user.update({
    where: {
      email: currentEmail,
    },
    data: {
      email: newEmail,
    },
  });
}

export async function updatePassword(email: string, password: string) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: password,
    },
  });
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

export async function fetchFilteredQuizzes(
  currentPage: number,
  query: string,
  tags: string[],
  userID?: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (userID) {
      const quizzes = await prisma.quiz.findMany({
      where: {
        created_by: userID,
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    const cleanedQuizzes: QuizDef[] = [];
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
    } else {
      const quizzes = await prisma.quiz.findMany({
        where: {
          category: {
            contains: query,
          },
        },
        skip: offset,
        take: ITEMS_PER_PAGE,
      });
      const cleanedQuizzes: QuizDef[] = [];
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
    }
    
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch quizzes.");
  }
}

export async function fetchQuizPages(query: string, userID?: string) {
  try {
    if (userID) {
      const count = await prisma.quiz.count({
        where: {
          created_by: userID,
        },
      });
      const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
      return totalPages;
    } else {
      const count = await prisma.quiz.count({
        where: {
          category: {
            contains: query,
          },
        },
      });
      const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
      return totalPages;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchQuiz(id: string) {
  try {
    const rawQuiz = await prisma.q_junction.findMany({
      where: {
        quiz_id: id,
      },
      include: {
        question: true,
        quiz: true,
      },
    });
    const refinedQuiz: QuizDef = {
      id: rawQuiz[0].quiz.id,
      created_by: rawQuiz[0].quiz.created_by,
      category: rawQuiz[0].quiz.category,
      questions: rawQuiz.map(({ question }) => question),
    };
    return refinedQuiz;
  } catch (error) {
    throw new Error("Failed to fetch Quiz.");
  }
}
