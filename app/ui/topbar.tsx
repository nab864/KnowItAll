import SignIn from "./forms/sign-in";
import { auth } from "@/auth";
import SignOut from "./forms/sign-out";

export default async function TopNav() {
  const session = await auth();
  console.log(session)
  return (
    <div className="flex flex-col">
      <div className="m-1 p-1 bg-white flex flex-col">
        {session ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
}
