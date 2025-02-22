import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma";
import { getUserByEmail } from "./app/lib/data";
import { NextAuthConfig } from "next-auth";



export const authConfig = {
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserByEmail(user.email ?? "")
      const email = user.email as string
      if (!existingUser) {
        try {
          await prisma.user.create({
            data: {
              email: email,
              isExternal:true
            }
          })
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e.message)
            return false
          }
          throw e
        }
      }
      return true
    },
  },
  providers: []
} satisfies NextAuthConfig;
