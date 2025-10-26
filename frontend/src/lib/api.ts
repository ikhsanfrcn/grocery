import axios from "axios";
import { Product } from "../interface/type";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get<Product[]>(`${BASE}/products`);
  return res.data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await axios.get<Product>(`${BASE}/products/${id}`);
  return res.data;
}
