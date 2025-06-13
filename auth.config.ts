import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma";
import { fetchUserByEmail } from "./app/lib/data";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await fetchUserByEmail(user.email ?? "");
      const email = user.email as string;
      if (!existingUser) {
        try {
          await prisma.user.create({
            data: {
              email: email,
              isExternal: true,
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e.message);
            return false;
          }
          throw e;
        }
      }
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      if (!isOnLogin) {
        if (isLoggedIn) return true;
        if (isOnProfile && !isLoggedIn) {
          return Response.redirect(new URL("/login", nextUrl));
        }
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/browse", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
