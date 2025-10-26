import { BellIcon } from "lucide-react";
import LocationPicker from "./locationPicker";
import Link from "next/link";
import CartIcon from "./cartIcon";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-gray-50 p-4 flex items-center justify-between gap-4 border-b border-gray-200 shadow-sm">
          <LocationPicker />
          <div className="flex items-center gap-3">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <Link href="/cart">
              <CartIcon />
            </Link>
          </div>
        </header>
    )
}