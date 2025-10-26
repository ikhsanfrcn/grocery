"use client";

import { HomeIcon, UserIcon } from "lucide-react";
import CartIcon from "./cartIcon";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3">
      <button
        onClick={() => router.push("/")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500 cursor-pointer"
      >
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </button>

      <button
        onClick={() => router.push("/cart")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500 cursor-pointer"
      >
        <CartIcon />
        <span className="text-xs">Cart</span>
      </button>

      <button className="flex flex-col items-center text-gray-700 hover:text-blue-500 cursor-pointer">
        <UserIcon className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </button>
    </footer>
  );
}
