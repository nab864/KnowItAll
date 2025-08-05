import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-3">
        <Link href="/browse" className="bg-component rounded-lg p-1 hover:bg-select transition-colors">
          <h1>Browse</h1>
        </Link>

        <Link href="/create" className="bg-component rounded-lg p-1 hover:bg-select transition-colors">
          <h1>Create</h1>
        </Link>
      </div>
    </div>
  );
}
