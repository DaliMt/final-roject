"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export default function CourseSidebarItem({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-sky-600/20   ",
        isActive &&
          "text-slate-700 bg-slate-200/90 hover:bg-sky-600/20 hover:text-slate-700",
        isCompleted &&
          "text-emerald-700 bg-emerald-200/50 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-300/90"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700 ",
            isCompleted && "text-emerald-700"
          )}
        />

        {label}
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      />
    </button>
  );
}
