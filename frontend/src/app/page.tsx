import CartIcon from "@/src/components/cartIcon";
import LocationPicker from "@/src/components/locationPicker";
import { fetchProducts } from "@/src/lib/api";
import { Product } from "@/src/interface/type";
import SearchProducts from "../components/searchProduct";

export default async function HomePage() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between gap-10">
          <LocationPicker />
          <CartIcon />
        </div>

        <div className="mt-4">
          <SearchProducts products={products} />
        </div>
      </div>
    </main>
  );
}
