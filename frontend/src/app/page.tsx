import { fetchProducts } from "@/src/lib/api";
import { Product } from "@/src/interface/type";
import ProductCatalog from "../components/productCatalog";

export default async function HomePage() {
  const products: Product[] = await fetchProducts();

  return (
    <main>
      <div className="mt-6">
        <ProductCatalog products={products} />
      </div>
    </main>
  );
}
