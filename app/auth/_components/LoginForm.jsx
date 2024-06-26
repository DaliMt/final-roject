"use client";
import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-sky-700 ">
      <div className="grid place-items-center h-screen ">
        <div className="shadow-lg bg-slate-100 rounded-lg p-5 border-t-4 border-green-500">
          <h1 className="text-xl font-bold my-4">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <input
              className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Link className="text-sm text-left" href={"/auth/register"}>
              <span className="px-1 text-red-500">Forgot password?</span>
            </Link>
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white text-sm w-fit py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <Link className="text-sm mt-3 text-right" href={"/auth/register"}>
              Don&apos;t have an account?
              <span className="px-1 underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
