import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      className="block px-4 py-2 text-sm hover:bg-select rounded-md"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
