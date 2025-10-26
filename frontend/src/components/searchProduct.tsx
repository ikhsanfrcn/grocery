"use client";

import { useState } from "react";
import { Product } from "@/src/interface/type";
import ProductCardSSR from "./ssr/productCard";

interface Props {
  products: Product[];
}

export default function SearchProducts({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
      />

      <section className="mb-14">
        <h2 className="font-medium mb-2">Today's Choice</h2>
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(165px,1fr))]">
          {filtered.map((p) => (
            <div key={p.id} className="relative">
              <ProductCardSSR product={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
