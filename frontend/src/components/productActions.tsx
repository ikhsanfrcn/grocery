"use client";

import { useState } from "react";
import { useCart } from "../context/cart";
import { Product, Variant } from "../interface/type";
import { useNotification } from "./notification";

export default function ProductActions({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const defaultVariant: Variant = product.variants[0];
  const { addNotification } = useNotification();

  const [selected, setSelected] = useState<Variant>(defaultVariant);

  const handleAdd = () => {
    dispatch({ type: "add", product, variant: selected });
    addNotification({
      type: 'success',
      message: `${product.title} ditambahkan ke keranjang`
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const isOutOfStock = selected.stock === 0;
  const [isAdding, setIsAdding] = useState(false);

  const handleAddWithLoading = async () => {
    if (isOutOfStock || isAdding) return;
    
    setIsAdding(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      handleAdd();
    } catch (error) {
      console.error(error);
      addNotification({
        type: 'error',
        message: 'Gagal menambahkan ke keranjang'
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Variant Selector */}
      <select
        value={selected.id}
        onChange={(e) => {
          const variant = product.variants.find(v => v.id === Number(e.target.value));
          if (variant) setSelected(variant);
        }}
        className="w-full border rounded-md p-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {product.variants.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.name} - {formatPrice(variant.price)}
          </option>
        ))}
      </select>

      {/* Updated Stock Info */}
      <div className="text-xs text-gray-500">
        Stok: {selected.stock} | SKU: {selected.sku}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">
          {formatPrice(selected.price)}
        </div>
        <button
          onClick={handleAddWithLoading}
          disabled={isOutOfStock || isAdding}
          className={`ml-2 px-3 py-1 rounded-full border transition-colors ${
            isOutOfStock 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : isAdding
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100 active:bg-gray-200'
          }`}
        >
          {isAdding ? '...' : isOutOfStock ? 'Habis' : '+ Cart'}
        </button>
      </div>
    </div>
  );
}
