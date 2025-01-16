import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function getUser(username: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findMany({
      where:{
        username: username
      }
    })
    return user[0]
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.")
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string().min(3),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user;
        }

        return null
      },
    }),
  ],
});
