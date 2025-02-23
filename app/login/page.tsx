import LoginForm from "../ui/forms/login-form";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { providerMap, signIn } from "@/auth";
import Image from "next/image";
import { Button } from "../ui/buttons";

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
            <Button type="submit" className="w-full p-2 flex justify-center rounded-lg border border-black hover:bg-gray-300 transition-colors">
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
      </div>
    </main>
  );
}
