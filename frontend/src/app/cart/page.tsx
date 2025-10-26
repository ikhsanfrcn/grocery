"use client";

import { useCart } from "@/src/context/cart";
import { whatsappUrl } from "../../lib/whatsapp";
import { useLocation } from "@/src/context/location";
import CartItem from "@/src/components/cartItem";
import Link from "next/link";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { address, detail } = useLocation();

  const total = state.lines.reduce(
    (sum, line) => sum + line.qty * line.variant.price,
    0
  );

  function handleCheckout() {
    const url = whatsappUrl({
      lines: state.lines,
      address,
      detail,
    });
    window.open(url, "_blank");
  }

  return (
    <div className="p-4 pb-24">
      <h2 className="text-lg font-semibold mb-4">Keranjang</h2>

      {state.lines.length === 0 ? (
        <div className="text-center text-slate-500 space-y-4 mt-10">
          <p>Keranjang masih kosong</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Kembali
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {state.lines.map((line) => (
            <CartItem
              key={line.variant.id}
              line={line}
              onUpdate={(q) =>
                dispatch({ type: "update", variantId: line.variant.id, qty: q })
              }
              onRemove={() =>
                dispatch({ type: "remove", variantId: line.variant.id })
              }
            />
          ))}

          <div className="border rounded-lg p-4 mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              Checkout via WhatsApp
            </button>
            <Link
              href="/"
              className="block text-center py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
