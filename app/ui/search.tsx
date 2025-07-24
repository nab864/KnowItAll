"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);
  return (
    <div className="bg-component mb-3 p-2 relative rounded-lg">
      <label htmlFor="search" className="">
        <MagnifyingGlassIcon className="absolute w-6 top-3 left-3 select-none" />
        <input
          className="pl-8 bg-background py-1 text-foreground"
          type="text"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          
        />
      </label>
    </div>
  );
}
