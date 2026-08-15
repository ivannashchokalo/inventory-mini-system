import axios from "axios";
import type { Product, ProductId } from "../types/product";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

interface CreateBody {
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

interface editProductPayload {
  id: ProductId;
  body: Partial<CreateBody>;
}

export const getProducts = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const deleteProduct = async (id: ProductId) => {
  const { data } = await api.delete<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (body: CreateBody) => {
  const { data } = await api.post<Product>("/products", body);
  return data;
};

export const editProduct = async ({ id, body }: editProductPayload) => {
  const { data } = await api.patch(`/products/${id}`, body);
  return data;
};

export const getProductById = async (id: ProductId) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};
