"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/auth";
import { signOutAction } from "../lib/actions";

export default function TopNav() {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClick = () => {
    setIsVisible(!isVisible);
    console.log(isVisible);
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="bg-white rounded-full align-bottom p-2 hover:bg-purple-600"
        onClick={handleOnClick}
      >
        <Image
          src="/account.svg"
          width={30}
          height={30}
          alt="Account Picture"
        />
      </button>
      <div className={clsx("m-1 p-1 bg-white flex flex-col", { visible: isVisible, hidden: !isVisible })}>
        <Link href={"/login"}>Log In</Link>
        <form
        action={signOutAction}
      >
        <button>Sign Out</button>
      </form> 
      </div>
    </div>
  );
}


