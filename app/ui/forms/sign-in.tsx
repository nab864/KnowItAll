import { signIn } from "@/auth";
import Link from "next/link";

export default async function SignIn() {
  return (
    <Link
      className="block px-4 py-2 text-sm hover:bg-purple-600 rounded-md"
      href="/login"
    >
      Signin
    </Link>
  );
}
