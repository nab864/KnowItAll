import Link from "next/link";


export default function UpdateButton({id}: {id: string}) {

  return (
    <Link href={`/update/${id}`} className="rounded-md border p-2 my-1 hover:bg-main transition-colors">
      Update
    </Link>
  )
}