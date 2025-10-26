"use client";

import { useState, useMemo } from "react";
import { Product, FilterOptions } from "@/src/interface/type";
import ProductFilter from "./productFilter";
import { ProductCardSkeleton } from "./loadingSpinner";
import { SearchIcon } from "lucide-react";
import ProductCardSSR from "./productCard";

interface Props {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductCatalog({ products, isLoading = false }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "Semua",
    priceRange: { min: 0, max: 1000000 },
    sortBy: "name",
  });

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.category === "Semua" || product.category === filters.category;

      // Price filter
      const matchesPrice = product.variants.some(
        (variant) =>
          variant.price >= filters.priceRange.min &&
          variant.price <= filters.priceRange.max
      );

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "price-low":
          const minPriceA = Math.min(...a.variants.map((v) => v.price));
          const minPriceB = Math.min(...b.variants.map((v) => v.price));
          return minPriceA - minPriceB;
        case "price-high":
          const maxPriceA = Math.max(...a.variants.map((v) => v.price));
          const maxPriceB = Math.max(...b.variants.map((v) => v.price));
          return maxPriceB - maxPriceA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, filters]);

  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari produk, kategori, atau deskripsi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-sm"
        />
      </div>

      {/* Filter Component */}
      <ProductFilter
        onFilterChange={setFilters}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Results Section */}
      <section className="mb-14">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">
            {searchTerm ? `Hasil pencarian "${searchTerm}"` : "Katalog Produk"}
          </h2>
          <span className="text-sm text-gray-500">
            {isLoading ? "..." : `${filteredAndSortedProducts.length} produk`}
          </span>
        </div>

        {isLoading ? (
          <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(165px,1fr))]">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg mb-2">Produk tidak ditemukan</p>
            <p className="text-sm">
              Coba ubah kata kunci atau filter pencarian
            </p>
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(165px,1fr))]">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="relative min-w-0">
                <ProductCardSSR product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}