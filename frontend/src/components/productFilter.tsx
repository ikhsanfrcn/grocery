/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FilterOptions } from "../interface/type";
import { getCategories, getPriceRange } from "../lib/api";
import { ChevronDownIcon, FilterIcon } from "lucide-react";

interface Props {
  onFilterChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProductFilter({ onFilterChange, isOpen, onToggle }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [filters, setFilters] = useState<FilterOptions>({
    category: "Semua",
    priceRange: { min: 0, max: 1000000 },
    sortBy: "name"
  });

  useEffect(() => {
    async function loadFilterData() {
      const [cats, range] = await Promise.all([
        getCategories(),
        getPriceRange()
      ]);
      setCategories(["Semua", ...cats]);
      
      const filterRange = { min: 0, max: range.max };
      setPriceRange(filterRange);
      setFilters(prev => ({
        ...prev,
        priceRange: filterRange
      }));
    }
    loadFilterData();
  }, []);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "Semua",
      priceRange: { min: 0, max: priceRange.max },
      sortBy: "name"
    });
  };

  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <FilterIcon className="w-4 h-4" />
        <span>Filter & Sort</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-white rounded-lg border shadow-sm space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Range Harga: Rp {filters.priceRange.min.toLocaleString()} - Rp {filters.priceRange.max.toLocaleString()}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                step={5000}
                value={filters.priceRange.min}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  min: Number(e.target.value)
                })}
                className="w-full"
              />
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                step={5000}
                value={filters.priceRange.max}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: Number(e.target.value)
                })}
                className="w-full"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium mb-2">Urutkan</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterOptions['sortBy'])}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Nama A-Z</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}