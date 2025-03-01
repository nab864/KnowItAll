import Button from "@/app/ui/navigation/button";

export default function SideNav() {
  return (
    <div className="flex flex-col bg-white rounded-lg p-1 h-[98%] fixed ml-2 mt-2">
      <h1 className="text-4xl">KnowItAll</h1>
      <div className="bg-purple-600 w-full h-0.5" />
      <div className="mt-2">
        <Button urlRef="/browse" text="Browse"></Button>
        <Button urlRef="/create" text="Create"></Button>
      </div>
    </div>
  );
}
