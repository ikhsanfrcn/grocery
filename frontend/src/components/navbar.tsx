"use client";

import { HomeIcon, TagIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-3">
      <button
        onClick={() => router.push("/")}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500 cursor-pointer"
      >
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </button>

      <button
        className="flex flex-col items-center text-gray-700 hover:text-blue-500 cursor-pointer"
      >
        <TagIcon />
        <span className="text-xs">Discount</span>
      </button>

      <button className="flex flex-col items-center text-gray-700 hover:text-blue-500 cursor-pointer">
        <UserIcon className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
}
