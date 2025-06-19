import LoginForm from "../ui/forms/login-form";
import { providerMap, signIn } from "@/auth";
import Image from "next/image";
import { Button } from "../ui/buttons";
import Link from "next/link";

export default function Login(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
        <h1 className="text-center">Or Sign In Using</h1>
        {Object.values(providerMap).map((provider) => (
          <form
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
            <Button type="submit" className="w-full p-2 bg-component flex justify-center rounded-lg border border-foreground hover:bg-gray-400 transition-colors">
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
        <h1 className="text-center">Don't Have an Account?</h1>
        <Link href={"/login/sign-up"}>Sign Up</Link>
      </div>
    </main>
  );
}
