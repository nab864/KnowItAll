import { signOut } from "@/auth";
import Button from "@/app/ui/navigation/button";

export default function SideNav() {
  return (
    <div className="flex flex-col my-2 ml-2 bg-white rounded-lg p-1">
      <h1 className="text-4xl">KnowItAll</h1>
      <div className="bg-purple-600 w-full h-0.5"></div>
      <div className="mt-2">
        <Button urlRef="/browse" text="Browse"></Button>
        <Button urlRef="/create" text="Create"></Button>
      </div>
    </div>
  );
}
