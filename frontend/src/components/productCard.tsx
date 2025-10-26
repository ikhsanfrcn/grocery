import { Product } from "@/src/interface/type";
import ProductActions from "./productActions";
import Image from "next/image";
import ImageCarousel from "./imageCarousel";

export default function ProductCardSSR({ product }: { product: Product }) {
  const defaultVariant = product.variants[0];
  const images = product.images ?? [""];
  const isOutOfStock = defaultVariant.stock === 0;
  const isLowStock = defaultVariant.stock > 0 && defaultVariant.stock <= 5;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col justify-between h-full min-w-[180px] relative">
      {/* Category Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {product.category}
        </span>
      </div>

      {/* Stock Badge */}
      {(isOutOfStock || isLowStock) && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              isOutOfStock
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {isOutOfStock ? "Habis" : `Sisa ${defaultVariant.stock}`}
          </span>
        </div>
      )}

      <div className="w-full h-36 relative rounded-lg overflow-hidden bg-gray-100">
        {images[0] ? (
          images.length > 1 ? (
            <ImageCarousel images={images} alt={product.title} />
          ) : (
            <Image
              src={images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity ${
                isOutOfStock ? "opacity-50" : ""
              }`}
              loading="eager"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <h4 className="mt-2 text-sm font-medium line-clamp-2 min-h-10">
        {product.title}
      </h4>

      <p className="text-xs text-gray-500 line-clamp-2 mb-2">
        {product.description}
      </p>

      <div className="mt-2">
        <ProductActions product={product} />
      </div>
    </div>
  );
}
