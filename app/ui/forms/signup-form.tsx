"use client";

import { signup } from "@/app/lib/actions";
import { useActionState } from "react";
import { Button } from "../buttons";
import {
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function SignUpForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    signup,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="flex-1 rounded-lg bg-component px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Register</h1>
        <div className="w-full">
          <div>
            <label htmlFor="username" className="mb-1 mt-1 block">
              Username
            </label>
            <input
              className="peer block w-full rounded-md bg-background py-[9px] pl-2"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          {errorMessage?.errors?.username && (
            <p>{errorMessage.errors.username}</p>
          )}

          <div>
            <label htmlFor="firstname" className="mb-1 mt-1 block">
              Firstname
            </label>
            <input
              className="peer block w-full rounded-md bg-background py-[9px] pl-2"
              id="firstname"
              name="firstname"
              placeholder="Firstname"
            />
          </div>
          {errorMessage?.errors?.firstname && (
            <p>{errorMessage.errors.firstname}</p>
          )}
          <div>
            <label htmlFor="lastname" className="mb-1 mt-1 block">
              Lastname
            </label>
            <input
              className="peer block w-full rounded-md bg-background py-[9px] pl-2"
              id="lastname"
              name="lastname"
              placeholder="Lastname"
            />
          </div>
          {errorMessage?.errors?.lastname && (
            <p>{errorMessage.errors.lastname}</p>
          )}
          <div>
            <label htmlFor="email" className="mb-1 mt-1 block">
              Email
            </label>
            <input
              className="peer block w-full rounded-md bg-background py-[9px] pl-2"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          {errorMessage?.errors?.email && <p>{errorMessage.errors.email}</p>}
          <div>
            <label htmlFor="password" className="mb-1 mt-1 block">
              Password
            </label>
            <input
              className="peer block w-full rounded-md bg-background py-[9px] pl-2"
              id="password"
              name="password"
              type="password"
            />
          </div>
          {errorMessage?.errors?.password && (
            <p>{errorMessage.errors.password}</p>
          )}
        </div>
      </div>
      {errorMessage?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {errorMessage.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <Button
        className="mt-4 w-full flex h-10 items-center rounded-lg bg-component px-4 text-sm font-medium text-foreground transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 active:bg-gray-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        aria-disabled={isPending}
      >
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-foreground" />
      </Button>
    </form>
  );
}
