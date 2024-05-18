import HomeNavbarRoutes from "@/components/HomeNavbarRoutes";

import React from "react";
import Logo from "./Logo";

export default async function HomeNavbar() {
  return (
    <div className="p-4 border-b h-full bg-white flex items-center shadow-sm ">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <HomeNavbarRoutes />
      </div>
    </div>
  );
}
