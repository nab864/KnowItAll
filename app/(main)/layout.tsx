import SideNav from "@/app/ui/sidenav";
import TopNav from "@/app/ui/topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute right-0">
        <TopNav />
      </div>
      <div className="h-screen bg-gray-300 flex">
          <SideNav />
          <div className="grow">{children}</div>
      </div>
    </div>
  );
}
