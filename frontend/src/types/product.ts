export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductId = Product["id"];
