import Link from "next/link";


export default function PlayButton({id}: {id: string}) {

  return (
    <Link href={`/quiz/${id}`} className="rounded-md border p-2 hover:bg-purple-600">
      Play
    </Link>
  )
}