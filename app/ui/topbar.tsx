import SignIn from "./forms/sign-in";
import SignOut from "./forms/sign-out";
import { auth } from "@/auth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default async function TopNav() {
  const session = await auth();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full data-[open]:bg-purple-600 bg-white px-2 py-2 hover:bg-purple-500">
          <Image src="/account.svg" width={25} height={25} alt="Account" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 mr-2 p-1 w-24 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem as="div">{session ? <SignOut /> : <SignIn />}</MenuItem>
          <MenuItem as="div">
            {session ? (
              <Link href="/profile">
                <h1 className="block px-4 py-2 text-sm hover:bg-purple-600 rounded-md">
                  Profile
                </h1>
              </Link>
            ) : null}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
