export interface Variant {
  id: number;
  sku: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  images?: string[];
  price: number;
  variants?: Variant[];
}
