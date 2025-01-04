import Link from "next/link";


export default function PlayButton({id}: {id: string}) {

  return (
    <Link href={`/browse/${id}`} className="rounded-md border p-2 hover:bg-gray-300">
      Play
    </Link>
  )
}