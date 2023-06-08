import { Product } from "@/types/product";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api";

async function readProducts(
  compagnie_id: string,
  token: string,
  page: number = 1
): Promise<Product[]> {
  const response = await axios.get(`${BASE_URL}/products`, {
    params: {
      compagnie_id: compagnie_id,
      page: page,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function createProduct(
  compagnie_id: string,
  product: Product,
  token: string
): Promise<Product> {
  const response = await axios.post(`${BASE_URL}/products`, product, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function updateProduct(
  compagnie_id: string,
  id: number,
  product: Product,
  token: string
): Promise<Product> {
  const response = await axios.put(`${BASE_URL}/products/${id}`, product, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function deleteProduct(
  compagnie_id: string,
  id: number,
  token: string
): Promise<void> {
  await axios.delete(`${BASE_URL}/products/${id}`, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { readProducts, createProduct, updateProduct, deleteProduct };
