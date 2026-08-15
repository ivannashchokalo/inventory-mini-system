import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createProduct } from "../../services/api";
import styles from "./FormStyles.module.css";

export interface CreateForm {
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export default function CreateProductForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      navigate("/products");
    },
  });

  const onSubmit = (data: CreateForm) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="name">
          Name:<span className={styles.star}>*</span>
        </label>
        <input
          className={styles.input}
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
          Quantity:<span className={styles.star}>*</span>
        </label>
        <input
          className={styles.input}
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
          <p className={styles.error}>{errors.quantity.message}</p>
        )}
      </div>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="price">
          Price:<span className={styles.star}>*</span>
        </label>
        <input
          className={styles.input}
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: {
              value: 0,
              message: "Price can not be negative",
            },
          })}
        />
        {errors.price && (
          <p className={styles.error}> {errors.price.message}</p>
        )}
      </div>
      <div className={styles.mainWrap}>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={styles.textarea}
          id="description"
          {...register("description")}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating" : "Create"}
        </button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
