"use client";

import { useState } from "react";
import { useCart } from "../context/cart";
import { Product, Variant } from "../interface/type";
import { toast } from "react-toastify";

export default function ProductActions({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const defaultVariant: Variant = product.variants?.[0] ?? {
    id: product.id,
    sku: `SKU-${product.id}`,
    name: product.title,
    price: product.price,
  };

  const [selected, setSelected] = useState<Variant>(defaultVariant);

  const handleAdd = () => {
    dispatch({ type: "add", product, variant: selected });
    toast.success(`${product.title} ditambahkan ke keranjang`, { theme: "colored" });
  };

  return (
    <div className="flex items-center justify-between">
      {product.variants && product.variants.length > 0 && (
        <select
          value={selected?.id ?? ""}
          onChange={(e) => {
            const v = product.variants?.find((v) => v.id === Number(e.target.value));
            if (v) setSelected(v);
          }}
          className="border rounded-md p-1 text-sm mt-1"
        >
          {product.variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} - ${v.price.toFixed(2)}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={handleAdd}
        className="ml-2 px-3 py-1 rounded-full border hover:bg-gray-100"
      >
        + Cart
      </button>
    </div>
  );
}
