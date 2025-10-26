"use client";
import { useEffect, useState } from "react";
import { CartLine } from "../../../context/cart";
import { Variant } from "../../../interface/type";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useNotification } from "../../../components/notification";

export default function CartItem({
  line,
  onUpdate,
  onRemove,
  onChangeVariant,
}: {
  line: CartLine;
  onUpdate: (qty: number) => void;
  onRemove: () => void;
  onChangeVariant?: (newVariant: Variant) => void;
}) {
  const { product, variant, qty } = line;
  const img = product.images?.[0] ?? "";
  const [inputQty, setInputQty] = useState(qty);
  const { addNotification } = useNotification();

  useEffect(() => {
    setInputQty(qty);
  }, [qty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setInputQty(value);
      onUpdate(value);
    } else if (e.target.value === "") {
      setInputQty(NaN as unknown as number);
    }
  };

  const handleDecrease = () => {
    const newQty = Math.max(1, Number.isNaN(inputQty) ? 1 : inputQty - 1);
    setInputQty(newQty);
    onUpdate(newQty);
  };

  const handleIncrease = () => {
    const newQty = (Number.isNaN(inputQty) ? 0 : inputQty) + 1;
    // Check if new quantity exceeds stock
    if (newQty > variant.stock) {
      addNotification({
        type: 'error',
        message: `Stok tidak mencukupi. Stok tersedia: ${variant.stock}`
      });
      return;
    }
    setInputQty(newQty);
    onUpdate(newQty);
  };

  const isOutOfStock = variant.stock === 0;
  const isQuantityExceedsStock = inputQty > variant.stock;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVariant = product.variants.find(v => v.id === Number(e.target.value));
    if (newVariant && onChangeVariant) {
      // If new variant is out of stock, show warning but still allow change
      if (newVariant.stock === 0) {
        const confirmChange = window.confirm(
          `Variant "${newVariant.name}" sedang habis. Apakah Anda tetap ingin mengubah variant?`
        );
        if (!confirmChange) return;
        addNotification({
          type: 'warning',
          message: `Variant diubah ke "${newVariant.name}" (Habis Stok)`
        });
      } else {
        addNotification({
          type: 'success',
          message: `Variant diubah ke "${newVariant.name}"`
        });
      }
      onChangeVariant(newVariant);
    }
  };

  return (
    <div className="flex items-center gap-3 border rounded-lg p-3">
      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative">
        {img ? (
          <Image
            src={img}
            alt={product.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex-1">
        <div className="font-medium text-sm">{product.title}</div>
        
        {/* Variant Selector */}
        {product.variants.length > 1 && onChangeVariant ? (
          <div className="mt-1 mb-1">
            <select
              value={variant.id}
              onChange={handleVariantChange}
              className="text-xs border rounded px-2 py-1 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full max-w-[200px]"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} - {formatPrice(v.price)}
                  {v.stock === 0 ? ' (Habis)' : v.stock <= 5 ? ` (Sisa ${v.stock})` : ''}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-xs text-slate-500">
            {variant.name} • SKU: {variant.sku}
          </div>
        )}
        
        <div className="text-xs text-slate-500 items-center">
          <div>SKU: {variant.sku}</div>
          <div className={`py-0.5 rounded text-xs text-center max-w-[100px] ${
            variant.stock === 0 
              ? 'bg-red-100 text-red-700' 
              : variant.stock <= 5 
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {variant.stock === 0 ? 'Habis' : `Stok: ${variant.stock}`}
          </div>
        </div>
        <div className="text-xs text-slate-700 font-medium">
          {formatPrice(variant.price)}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* Quantity Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleDecrease}
            disabled={inputQty <= 1}
            className={`px-3 py-1 rounded transition-colors ${
              inputQty <= 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            -
          </button>
          <input
            type="number"
            value={Number.isNaN(inputQty) ? "" : inputQty}
            onChange={handleInputChange}
            className={`w-12 text-center outline-none border rounded px-1 ${
              isQuantityExceedsStock ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            style={{ appearance: "textfield" }}
            min={1}
            max={variant.stock}
          />
          <button
            onClick={handleIncrease}
            disabled={isOutOfStock || inputQty >= variant.stock}
            className={`px-3 py-1 rounded transition-colors ${
              isOutOfStock || inputQty >= variant.stock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2Icon className="w-3 h-3" />
          <span>Hapus</span>
        </button>

        {/* Stock Warning */}
        {isQuantityExceedsStock && (
          <div className="text-xs text-red-500 text-right">
            Melebihi stok tersedia
          </div>
        )}
      </div>
    </div>
  );
}
