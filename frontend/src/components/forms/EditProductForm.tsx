import { useForm } from "react-hook-form";
import type { CreateForm } from "./CreateProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { Product } from "../../types/product";
import { editProduct } from "../../services/api";
import styles from "./FormStyles.module.css";

interface EditProductFormProps {
  product: Product;
}
export default function EditProductForm({ product }: EditProductFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<CreateForm>>({
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      navigate("/products");
    },
  });

  const onSubmit = (data: Partial<CreateForm>) => {
    const body = {
      id: product.id,
      body: data,
    };

    mutate(body);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          className={`${styles.input} ${errors.name && styles.inputError}`}
          id="name"
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 charters",
            },
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="quantity">
          Quantity:
        </label>
        <input
          className={`${styles.input} ${errors.quantity && styles.inputError}`}
          id="quantity"
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            valueAsNumber: true,

            min: {
              value: 0,
              message: "Quantity can not be negative",
            },
          })}
        />
        {errors.quantity && (
          <p className={styles.error}> {errors.quantity.message}</p>
        )}
      </div>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="price">
          Price:
        </label>
        <input
          className={`${styles.input} ${errors.price && styles.inputError}`}
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Price can not be negative",
            },
          })}
        />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
      </div>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={styles.textarea}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button type="submit" disabled={isPending}>
          {isPending ? "Sending" : "Send"}
        </button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
