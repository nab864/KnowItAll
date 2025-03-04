import Link from "next/link";

export default function Button({
  urlRef,
  className,
  text,
}: {
  urlRef: string;
  className: string;
  text: string;
}) {
  return (
    <Link
      href={urlRef}
      className={className}
    >
      {text}
    </Link>
  );
}
