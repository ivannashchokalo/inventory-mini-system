import { useNavigate } from "react-router";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}
export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <li className={styles.card}>
      <h2 className={styles.name}>{product.name}</h2>
      <div className={styles.textContainer}>
        <p className={styles.price}>{product.price}$</p>
        <p
          className={`${styles.status} ${
            product.status === "out_of_stock"
              ? styles.outOfStock
              : product.status === "low_stock"
                ? styles.lowStock
                : styles.inStock
          }`}
        >
          {product.status}
        </p>
      </div>

      <p className={styles.text}>{product.description}</p>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.editBtn}
          type="button"
          onClick={() => navigate(`/products/${product.id}/edit`)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(product.id)}
          className={styles.deleteBtn}
        >
          Delete
        </button>
      </div>

      <div className={styles.dataWrapper}>
        <p className={styles.date}>
          Created: {new Date(product.createdAt).toLocaleDateString()}
        </p>

        {new Date(product.updatedAt).getTime() !==
          new Date(product.createdAt).getTime() && (
          <p className={styles.date}>
            Updated: {new Date(product.updatedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </li>
  );
}
