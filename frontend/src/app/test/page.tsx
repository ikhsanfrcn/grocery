"use client";

import ProductCard from "@/src/components/productCard";
import { Product } from "@/src/interface/type";
import { fetchProducts } from "@/src/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const filtered = products
    .slice(0, 20)
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <main className="p-4">
      <header className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Deliver to</p>
            <h1 className="font-semibold">Jakarta, Indonesia ▾</h1>
          </div>
          <Link href="/cart" className="text-sm">
            Cart
          </Link>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      <section>
        <h3 className="font-medium mb-2">Today&apos;s Choice</h3>
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
