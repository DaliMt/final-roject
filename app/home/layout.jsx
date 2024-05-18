import MySidebar from "../(dashboard)/_components/MySidebar";

import HomeNavbar from "./_components/HomeNavbar";
import HomeSidebar from "./_components/HomeSideBar";

export default function HomeDashboardLayout({ children }) {
  return (
    <div className=" h-full ">
      <div className="h-[80px] bg-green-200   fixed inset-y-0 z-50 w-full">
        <HomeNavbar />
      </div>
      {/* <div className="flex h-full w-56 flex-col fixed inset-y-0 z-50 bg-blue-500">
        <HomeSidebar />
      </div> */}
      <main className=" h-full pt-[80px]">{children}</main>
    </div>
  );
}
