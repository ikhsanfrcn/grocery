import { Product } from "@/src/interface/type";
import ProductActions from "../productAcion";

export default function ProductCardSSR({ product }: { product: Product }) {
  const defaultVariant = product.variants?.[0] ?? {
    id: product.id,
    sku: `SKU-${product.id}`,
    name: product.title,
    price: product.price,
  };

  const image = product.images?.[0] ?? "";
  const hasVariants = product.variants && product.variants.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col justify-between h-full min-w-[180px] relative">
      <div className="w-full h-36 relative rounded-lg overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <h4 className="mt-2 text-sm font-medium line-clamp-2 min-h-10">
        {product.title}
      </h4>

      <div className="text-xs text-gray-400 mt-1">
        {hasVariants ? `${product.variants!.length} variant(s) available` : "No variant available"}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-semibold">${defaultVariant.price.toFixed(2)}</div>
        <ProductActions product={product} />
      </div>

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            image: product.images,
            sku: defaultVariant.sku,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: defaultVariant.price,
              availability: "https://schema.org/InStock",
              url: `https://yourdomain.com/product/${product.id}`,
            },
          }),
        }}
      />
    </div>
  );
}
