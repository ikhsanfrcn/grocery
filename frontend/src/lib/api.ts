import { Product } from "../interface/type";
import productsData from '../../public/api/data/products.json';

// Fungsi utama untuk fetch products
export async function fetchProducts(): Promise<Product[]> {
  try {
    // Langsung pakai data statis yang di-import
    return productsData as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // fallback kosong
  }
}

// Cari product berdasarkan ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const products = await fetchProducts();
    const product = products.find(p => p.id === id);
    return product || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

// Ambil semua kategori unik
export async function getCategories(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Ambil rentang harga
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  try {
    const products = await fetchProducts();
    const prices = products.flatMap(p => p.variants.map(v => v.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return { min: 0, max: 1000000 };
  }
}
