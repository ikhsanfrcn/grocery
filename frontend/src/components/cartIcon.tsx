"use client";

import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";

export default function CartIcon() {
  const { state } = useCart();
  const [pulse, setPulse] = useState(false);
  const count = state.lines.length;
  const totalQuantity = state.lines.reduce((s, l) => s + l.qty, 0);

  useEffect(() => {
    if (count <= 0) return;
    const id = requestAnimationFrame(() => {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(timeout);
    });
    return () => cancelAnimationFrame(id);
  }, [count]);

  return (
    <div className="relative inline-block group">
      <motion.div
        animate={pulse ? { scale: 1.2 } : { scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-full"
      >
        <div className="relative">
          <ShoppingCartIcon className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {count}
            </span>
          )}
        </div>
      </motion.div>
      
      {/* Tooltip */}
      {count > 0 && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
          {count} item{count > 1 ? 's' : ''} ({totalQuantity} total)
        </div>
      )}
    </div>
  );
}
