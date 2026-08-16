import { useNavigate } from "react-router";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}
export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
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
            onClick={() => setIsConfirmOpen(true)}
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
      {isConfirmOpen && (
        <Modal onModalClose={() => setIsConfirmOpen(false)}>
          <h2 className={styles.modalTitle}>Delete card</h2>
          <p className={styles.modalText}>
            Are you sure you want to delete this card?
          </p>
          <div className={styles.modalBtnsWrapper}>
            <button
              className={styles.modalBtnCancel}
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
