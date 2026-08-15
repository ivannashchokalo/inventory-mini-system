import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProductById } from "../../services/api";
import EditProductForm from "../../components/forms/EditProductForm";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./EditProductPage.module.css";

export default function EditProductPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(Number(id)),
  });
  return (
    <>
      <h1 className={styles.title}>Edit Product</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && <EditProductForm product={data} />}
    </>
  );
}
