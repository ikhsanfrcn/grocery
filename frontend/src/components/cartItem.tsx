"use client";

import { Product } from "../interface/type";

export default function CartItem({
  line,
  onUpdate,
  onRemove
}: {
  line: { product: Product; qty: number };
  onUpdate: (qty: number) => void;
  onRemove: () => void;
}) {
  const { product, qty } = line;
  const img = product.images?.[0] ?? "";

  return (
    <div className="flex items-center gap-3 border rounded-lg p-3">
      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
        {img ? <img src={img} alt={product.title} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{product.title}</div>
        <div className="text-xs text-slate-500">${product.price.toFixed(2)}</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <button onClick={() => onUpdate(qty - 1)} className="px-2 py-1 border rounded">-</button>
          <div className="px-3">{qty}</div>
          <button onClick={() => onUpdate(qty + 1)} className="px-2 py-1 border rounded">+</button>
        </div>
        <button onClick={onRemove} className="text-xs text-red-500 mt-2">Remove</button>
      </div>
    </div>
  );
}
