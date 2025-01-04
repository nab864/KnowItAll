import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-3">
        <Link href="/browse">
          <h1>Browse</h1>
        </Link>

        <Link href="/create">
          <h1>Create</h1>
        </Link>
      </div>
    </div>
  );
}
