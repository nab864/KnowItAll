import LoginForm from "../ui/forms/login-form";
import { providerMap, signIn } from "@/auth";
import Image from "next/image";
import { Button } from "../ui/buttons";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Login() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
        <h1 className="text-center">Or Sign In Using</h1>
        {Object.values(providerMap).map((provider, index) => (
          <form
            key={index}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: "/browse",
                });
              } catch (error) {
                throw error;
              }
            }}
          >
            <Button
              type="submit"
              className="w-full p-2 bg-component flex justify-center rounded-lg border border-foreground hover:bg-gray-400 transition-colors"
            >
              <Image
                src={`/${provider.id}.svg`}
                width={25}
                height={25}
                alt="GitHub"
              />
              <span className="ml-2">Sign in with {provider.name}</span>
            </Button>
          </form>
        ))}
        <h1 className="text-center">{"Don't Have an Account?"}</h1>
        <Link
          href={"/login/sign-up"}
          className="mt-4 w-full flex h-10 items-center rounded-lg bg-component px-4 text-sm font-medium text-foreground transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 active:bg-gray-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-foreground" />
        </Link>
      </div>
    </main>
  );
}
