import { PrismaClient } from "@prisma/client";
import seedData from "@/app/lib/trivia-questions.json";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  await prisma.user.deleteMany({});
  await prisma.user.create({
    data: {
      username: "Admin",
      email: "kaifuller1995@gmail.com",
      password: await bcrypt.hash("password", 10),
      is_admin: true,
    },
  });
  prisma.$disconnect();
}

async function seedQuestions() {
  await prisma.question.deleteMany({});
  for (let i = 0; i < seedData.length; i++) {
    await prisma.question.create({
      data: {
        category: seedData[i].category,
        tags: seedData[i].tags,
        difficulty: seedData[i].difficulty,
        question: seedData[i].question,
        correctAnswer: seedData[i].correctAnswer,
        incorrectAnswers: seedData[i].incorrectAnswers,
        user: {
          connect: {
            email: "kaifuller1995@gmail.com",
          },
        },
        type: seedData[i].type,
      },
    });
  }
  prisma.$disconnect();
}

async function seedQuizzes() {
  const categories = [
    "General Knowledge",
    "Geography",
    "Society & Culture",
    "Music",
    "Food & Drink",
    "Sport & Leisure",
    "Film & TV",
    "Science",
    "Arts & Literature",
    "History",
  ];

  // Nested for loop creates 20 quizzes per category type
  for (let i = 0; i < categories.length; i++) {
    // Finds all questions with the current category
    const categoryQuestions = await prisma.question.findMany({
      where: {
        category: categories[i],
      },
    });
    for (let j = 0; j < 20; j++) {
      // Creates a quiz entry
      const quiz = await prisma.quiz.create({
        data: {
          user: {
            connect: {
              email: "kaifuller1995@gmail.com",
            },
          },
          category: categories[i],
        },
      });

      // List that will include non-repeating random numbers
      const indexList: number[] = [];
      // While loop to generate non-repeating random numbers and push to indexList
      while (indexList.length < 10) {
        const randomNum = Math.floor(Math.random() * categoryQuestions.length);
        if (!indexList.includes(randomNum)) {
          indexList.push(randomNum);
        }
      }
      // Creates a q_junction entry for the quiz and questions
      // q_junction allows for a many-to-many relationship between quizzes and questions
      indexList.forEach(async (i) => {
        await prisma.q_junction.create({
          data: {
            quiz: {
              connect: {
                id: quiz.id,
              },
            },
            question: {
              connect: {
                id: categoryQuestions[i].id,
              },
            },
          },
        });
      });
    }
  }
}

export async function GET() {
  try {
    await seedAdmin();
    await seedQuestions();
    await seedQuizzes();
    return Response.json({ message: "database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
