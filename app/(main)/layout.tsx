import SideNav from "@/app/ui/sidenav";
import TopNav from "@/app/ui/topbar";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex">
        <SideNav />
        <Suspense>
          <div className="grow">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
