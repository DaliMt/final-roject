"use client";
import { Compass, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function HomeSidebarItems() {
  const pathname = usePathname();
  const router = useRouter();
  const items = [
    {
      icon: Compass,
      label: "Browse",
      href: "/home",
    },

    {
      icon: LogIn,
      label: "LogIn",
      href: "/auth",
    },
  ];
  // const isActive =

  function onClick(href) {
    router.push(href);
  }
  let Icon;

  return (
    <div className="flex flex-col w-full">
      {items.map(
        (item) => (
          (Icon = item.icon),
          (
            <button
              onClick={() => onClick(item.href)}
              type="button"
              className={cn(
                "flex items-center gap-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
                // isActive &&
                //   "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
              )}
            >
              <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-500")} />
                {item.label}
              </div>
              <div
                className={cn(
                  "ml-auto  opacity-0 border-2 border-sky-700  h-[54px] transition-all"
                  // isActive && "opacity-100"
                )}
              />
            </button>
          )
        )
      )}
    </div>
  );
}
