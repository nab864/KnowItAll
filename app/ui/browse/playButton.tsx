import Link from "next/link";


export default function PlayButton({id}: {id: string}) {

  return (
    <Link href={`/quiz/${id}`} className="rounded-md border text-center p-2 hover:bg-main transition-colors">
      Play
    </Link>
  )
}