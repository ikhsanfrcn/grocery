"use client";
import { useEffect, useState } from "react";
import { CartLine } from "../context/cart";

export default function CartItem({
  line,
  onUpdate,
  onRemove
}: {
  line: CartLine;
  onUpdate: (qty: number) => void;
  onRemove: () => void;
}) {
  const { product, variant, qty } = line;
  const img = product.images?.[0] ?? "";
  const [inputQty, setInputQty] = useState(qty);

  useEffect(() => {
    setInputQty(qty);
  }, [qty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setInputQty(value);
      onUpdate(value);
    } else if (e.target.value === "") {
      setInputQty(NaN as unknown as number);
    }
  };

  return (
    <div className="flex items-center gap-3 border rounded-lg p-3">
      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
        {img ? <img src={img} alt={product.title} className="w-full h-full object-cover" /> : null}
      </div>

      <div className="flex-1">
        <div className="font-medium text-sm">{product.title}</div>
        <div className="text-xs text-slate-500">{variant.name} • SKU: {variant.sku}</div>
        <div className="text-xs text-slate-700">${variant.price.toFixed(2)}</div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={Number.isNaN(inputQty) ? "" : inputQty}
            onChange={handleChange}
            className="w-20 text-center border rounded p-1"
            min={1}
          />
        </div>

        <button onClick={onRemove} className="text-xs text-red-500 mt-2">Remove</button>
      </div>
    </div>
  );
}
