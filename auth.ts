import { prisma } from "./prisma";
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import bcryptjs from "bcryptjs";
import { z } from "zod";

const providers: Provider[] = [
  GitHub,
  Credentials({
    credentials: {
      username: {},
      password: {},
    },
    async authorize(credentials) {
      const parsedCredentials = z
        .object({
          username: z.string().min(3),
          password: z.string().min(8),
        })
        .safeParse(credentials);
      if (parsedCredentials.success) {
        const { username, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        const userPassword = user.password as string;
        const passwordMatch = await bcryptjs.compare(password, userPassword);
        if (passwordMatch) return user;
      }
      return null;
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers,
});
