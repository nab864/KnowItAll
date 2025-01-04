import Link from "next/link";

export default function TopNav() {
  return (
    <div className="flex justify-between">
      <Link href="/"><h1 className="text-4xl">KnowItAll</h1></Link>
      <h1>Profile Link</h1>
    </div>
  );
}