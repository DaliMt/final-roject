import HomeSidebarItems from "./HomeSideBarItems";
import Logo from "./Logo";

export default function HomeSidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <HomeSidebarItems />
      </div>
    </div>
  );
}
