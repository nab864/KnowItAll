"use client";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./buttons";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please Login</h1>
        <div className="w-full">
          <div>
            <label htmlFor="username" className="mb-3 mt-5 block">
              Username
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 placeholder:text-gray-500"
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-3 mt-5 block">
              Password
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
      </div>
      <Button className="mt-4 w-full" aria-disabled={isPending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
      </Button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
