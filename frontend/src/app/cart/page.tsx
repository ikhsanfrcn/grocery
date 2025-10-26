"use client";

import { useCart } from "@/src/context/cart";
import { whatsappUrl } from "../../lib/whatsapp";
import CartItem from "@/src/components/cartItem";

export default function CartPage() {
  const { state, dispatch } = useCart();

  // ✅ Total dari variant.price
  const total = state.lines.reduce((sum, line) => sum + line.qty * line.variant.price, 0);

  function handleCheckout() {
    const url = whatsappUrl(
      state.lines.map(line => ({
        product: line.product,
        variant: line.variant,
        qty: line.qty,
      }))
    );
    window.open(url, "_blank");
  }

  return (
    <div className="p-4 pb-24">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>

      {state.lines.length === 0 ? (
        <div className="text-center text-slate-500">Keranjang masih kosong</div>
      ) : (
        <div className="space-y-3">
          {state.lines.map(line => (
            <CartItem
              key={line.variant.id}
              line={line}
              onUpdate={(q) =>
                dispatch({
                  type: "update",
                  variantId: line.variant.id,
                  qty: q,
                })
              }
              onRemove={() =>
                dispatch({
                  type: "remove",
                  variantId: line.variant.id,
                })
              }
            />
          ))}

          <div className="border rounded-lg p-3 mt-6">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-3 w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
