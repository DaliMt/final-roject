"use client";

// import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

import teacher from "@/lib/teacher";
import { admin } from "@/lib/teacher";
import UserButton from "./UserButton";

export default function HomeNavbarRoutes({ imageUrl }) {
  const session = useSession();
  const userId = session?.data?.user?._id;
  const role = session?.data?.user?.role;
  const router = useRouter();
  console.log("useridddd", userId);
  console.log("useridddd", session?.data?.user?.imageUrl);
  // const {userId}=useAuth();

  const pathname = usePathname();
  function onClick(href) {
    router.push(href);
  }

  return (
    <div className=" flex gap-x-2  ">
      <div>
        <SearchInput />
      </div>

      <div className=" flex gap-x-2 ml-auto ">
        <button
          onClick={() => onClick("/auth")}
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          LogIn
        </button>
        <button
          onClick={() => onClick("/auth/register")}
          type="button"
          className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
        >
          SignUp
        </button>
      </div>
    </div>
  );
}
