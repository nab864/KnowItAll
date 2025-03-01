import Link from "next/link";

export default function Button({
  urlRef,
  text,
}: {
  urlRef: string;
  text: string;
}) {
  return (
    <div className="flex flex-col my-0.5">
      <Link href={urlRef} className=" text-center rounded-lg hover:bg-select">{text}</Link>
    </div>
  );
}
