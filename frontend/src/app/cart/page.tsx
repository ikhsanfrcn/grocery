"use client";

import { useCart } from "@/src/context/cart";
import { whatsappUrl } from "../../lib/whatsapp";
import { useLocation } from "@/src/context/location";
import CartItem from "@/src/app/cart/_components/cartItem";
import Link from "next/link";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { address, detail } = useLocation();

  const total = state.lines.reduce(
    (sum, line) => sum + line.qty * line.variant.price,
    0
  );

  const itemCount = state.lines.length;
  const totalQuantity = state.lines.reduce((sum, line) => sum + line.qty, 0);

  function handleCheckout() {
    const url = whatsappUrl({
      lines: state.lines,
      address,
      detail,
    });
    window.open(url, "_blank");
  }

  return (
    <div className="mt-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Keranjang</h2>
        {itemCount > 0 && (
          <div className="text-sm text-gray-500">
            {itemCount} item{itemCount > 1 ? 's' : ''} ({totalQuantity} total)
          </div>
        )}
      </div>

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
              onChangeVariant={(newVariant) =>
                dispatch({
                  type: "changeVariant",
                  oldVariantId: line.variant.id,
                  newVariant: newVariant,
                  product: line.product
                })
              }
            />
          ))}

          <div className="border rounded-lg p-4 mt-6 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Item</span>
                <span>{itemCount} item{itemCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Quantity</span>
                <span>{totalQuantity} pcs</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span className="font-medium">Total Harga</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(total)}
                </span>
              </div>
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
