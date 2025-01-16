import { signOut } from "@/auth";
import Link from "next/link";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col justify-center items-center">
      <Link href="/browse">
        <h1>Browse</h1>
      </Link>

      <Link href="/create">
        <h1>Create</h1>
      </Link>
      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <button>Sign Out</button>
      </form>
    </div>
  );
}
