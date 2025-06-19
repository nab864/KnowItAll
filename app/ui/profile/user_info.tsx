"use client";
import {
  submitEmail,
  submitFirstName,
  submitLastName,
  submitUserName,
} from "@/app/lib/actions";
import { UserData } from "@/app/lib/definitions";
import { Button } from "@/app/ui/buttons";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export default function UserInfo({
  userData,
  image,
}: {
  userData: UserData;
  image: string | undefined | null;
}) {
  const [editUserName, setEditUserName] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [userName, setUserName] = useState(userData?.username);
  const [firstName, setFirstName] = useState(userData?.first_name);
  const [lastName, setLastName] = useState(userData?.last_name);
  const [email, setEmail] = useState(userData?.email);

  const handleUserNameClick = () => {
    submitUserName(userData?.email, userName);
    setEditUserName(false);
  };
  const handleFirstNameClick = () => {
    submitFirstName(userData?.email, firstName);
    setEditFirstName(false);
  };
  const handleLastNameClick = () => {
    submitLastName(userData?.email, lastName);
    setEditLastName(false);
  };
  const handleEmailClick = () => {
    submitEmail(userData?.email, email);
    setEditEmail(false);
  };
  return (
    <>
      <table className="bg-component w-1/4 rounded-lg m-2">
        <tbody className="">
          <tr className="w-full">
            <td className="text-right px-2 w-1/3">Username:</td>
            <td className="text-center px-2 w-1/3">
              {editUserName ? (
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className="bg-background p-2"
                  placeholder={userData?.username ?? "Enter Username"}
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                userName
              )}
            </td>
            <td className="text-right px-1 w-1/3">
              {editUserName ? (
                <Button
                  children={"Submit"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={handleUserNameClick}
                />
              ) : (
                <Button
                  children={userData?.first_name ? "Update" : "Add"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={() => setEditUserName(true)}
                />
              )}
            </td>
          </tr>
          <tr className="w-full p-1">
            <td className="text-right px-1 w-1/3">First Name:</td>
            <td className="text-center px-1 w-1/3">
              {editFirstName ? (
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="bg-background"
                  placeholder={userData?.first_name ?? "Enter First Name"}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                firstName
              )}
            </td>
            <td className="text-right px-1 w-1/3">
              {editFirstName ? (
                <Button
                  children={"Submit"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={handleFirstNameClick}
                />
              ) : (
                <Button
                  children={userData?.first_name ? "Update" : "Add"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={() => setEditFirstName(true)}
                />
              )}
            </td>
          </tr>
          <tr className="w-full p-1">
            <td className="text-right px-1 w-1/3">Last Name:</td>
            <td className="text-center px-1 w-1/3">
              {editLastName ? (
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="bg-background"
                  placeholder={userData?.last_name ?? "Enter Last Name"}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                lastName
              )}
            </td>
            <td className="text-right px-1 w-1/3">
              {editLastName ? (
                <Button
                  children={"Submit"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={handleLastNameClick}
                />
              ) : (
                <Button
                  children={userData?.first_name ? "Update" : "Add"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={() => setEditLastName(true)}
                />
              )}
            </td>
          </tr>
          <tr className="w-full p-1">
            <td className="text-right px-1 w-1/3">Email:</td>
            <td className="text-center px-1 w-1/3">
              {editEmail ? (
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-background"
                  placeholder={userData?.email ?? "Enter Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                email
              )}
            </td>
            <td className="px-1 w-1/3">
              {image ? (
                <Image src="github.svg" alt="GitHub" width={50} height={50} className="p-1 block ml-auto" />
              ) : editEmail ? (
                <Button
                  children={"Submit"}
                  className="bg-background rounded-lg p-1 hover:bg-select"
                  onClick={handleEmailClick}
                />
              ) : (
                <Button
                  children={userData?.first_name ? "Update" : "Add"}
                  className={clsx(
                    "bg-background rounded-lg p-1 hover:bg-select",
                    {
                      "pointer-events-none":
                        editFirstName || editLastName || editEmail,
                    }
                  )}
                  onClick={() => setEditEmail(true)}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
