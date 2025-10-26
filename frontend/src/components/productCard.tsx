
"use client";
import { useCart } from "../context/cart";
import { Product } from "../interface/type";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const image = product.images?.[0] ?? "";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3">
      <div className="w-full h-36 relative rounded-lg overflow-hidden bg-gray-100">
        {image ? (
          <img src={image} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <h4 className="mt-2 text-sm font-medium line-clamp-2 min-h-10">{product.title}</h4>
      <div className="mt-1 flex items-center justify-between">
        <div className="text-sm font-semibold">${product.price.toFixed(2)}</div>
        <button
          onClick={() => dispatch({ type: "add", product })}
          className="ml-2 px-3 py-1 rounded-full border"
        >
          + Cart
        </button>
      </div>
    </div>
  );
}
