"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalide credentials.";
          default:
            return "Something went wrong."
      }
    }
    throw error;
  }
}

export async function signOutAction( formData: FormData) {
  await signOut();
}