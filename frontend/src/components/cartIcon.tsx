"use client";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";

export default function CartIcon() {
  const { state } = useCart();
  const [pulse, setPulse] = useState(false);
  const count = state.lines.reduce((s, l) => s + l.qty, 0);

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
    <Link href="/cart" className="relative inline-block">
      <motion.div
        animate={pulse ? { scale: 1.2 } : { scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-2 rounded-full font-semibold"
      >
        <div className="flex">
          <TiShoppingCart className="text-2xl"/> <span className="">{count}</span>
        </div>
      </motion.div>
    </Link>
  );
}
