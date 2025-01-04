import { Question } from "@prisma/client";

export type Quiz = {
  id: string;
  created_by: string;
  category: string;
  questions: Question[]
}