export interface Variant {
  id: number;
  sku: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  category: string;
  images?: string[];
  variants: Variant[];
}

export interface FilterOptions {
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'name' | 'price-low' | 'price-high';
}
