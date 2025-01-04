import SideNav from "@/app/ui/sidenav";
import TopNav from "@/app/ui/topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNav /> 
      <div className="flex h-screen ">
        <div className="flex-none">
          <SideNav />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
