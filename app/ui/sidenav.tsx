import Button from "@/app/ui/navigation/button";

export default function SideNav() {
  return (
    <div className="flex-col bg-component rounded-lg p-1 h-[98%] fixed ml-2 mt-2 hidden sm:flex">
      <Button urlRef="/" text="KnowItAll" className="text-4xl" />
      <div className="bg-main w-full h-0.5" />
      <div className="mt-2">
        <Button
          urlRef="/browse"
          text="Browse"
          className="flex flex-col my-0.5 text-center rounded-lg hover:bg-select transition-colors"
        ></Button>
        <Button
          urlRef="/create"
          text="Create"
          className="flex flex-col my-0.5 text-center rounded-lg hover:bg-select transition-colors"
        ></Button>
      </div>
    </div>
  );
}
