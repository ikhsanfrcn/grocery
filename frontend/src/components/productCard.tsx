"use client";

import { useState } from "react";
import { useCart } from "../context/cart";
import { Product, Variant } from "../interface/type";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const defaultVariant: Variant = {
    id: product.id,
    sku: `SKU-${product.id}`,
    name: product.title,
    price: product.price,
  };

  const [selected, setSelected] = useState<Variant>(
    () => product.variants?.[0] ?? defaultVariant
  );

  const image = product.images?.[0] ?? "";

  const handleAdd = () => {
    dispatch({ type: "add", product, variant: selected });
     toast.success(`${product.title} ditambahkan ke keranjang`, {
      theme: "colored",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col justify-between h-full min-w-[180px]">
      <div className="w-full h-36 relative rounded-lg overflow-hidden bg-gray-100">
        {image ? (
          <img src={image} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <h4 className="mt-2 text-sm font-medium line-clamp-2 min-h-10">
        {product.title}
      </h4>

      {product.variants && product.variants.length > 0 ? (
        <select
          value={selected?.id ?? ""}
          onChange={(e) => {
            const v = product.variants?.find(
              (v) => v.id === Number(e.target.value)
            );
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
      ) : (
        <div className="text-xs text-gray-400 mt-1">No variant available</div>
      )}

      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm font-semibold">
          ${selected?.price.toFixed(2)}
        </div>
        <button
          onClick={handleAdd}
          className="ml-2 px-3 py-1 rounded-full border hover:bg-gray-100"
        >
          + Cart
        </button>
      </div>
    </div>
  );
}
