import SideNav from "@/app/ui/sidenav";
import TopNav from "@/app/ui/topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex">
          <SideNav />
          <div className="grow">{children}</div>
      </div>
    </div>
  );
}
