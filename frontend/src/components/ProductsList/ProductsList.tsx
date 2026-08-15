import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductId } from "../../types/product";
import ProductCard from "../ProductCard/ProductCard";
import { deleteProduct } from "../../services/api";
import styles from "./ProductsList.module.css";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDeleteProduct = (id: ProductId) => {
    mutate(id);
  };
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDeleteProduct}
        />
      ))}
    </ul>
  );
}
