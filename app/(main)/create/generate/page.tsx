import GeneratePage from "@/app/ui/generate/generate-page";
import { auth } from "@/auth";


export default async function Page(props: {
  searchParams?: Promise<{
    category?: string;
    number: string;
  }>
}) {
  const session = await auth()
  const searchParams = await props.searchParams;

  const category = searchParams?.category || ""
  const number = searchParams?.number || ""
  
  return (
    <div className="flex flex-col justify-center items-center h-full text-center mt-10">
      <h1>Generate Quiz</h1>
      <GeneratePage number={number} category={category} session={session} />
    </div>
  );
}
