import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/api";
import ProductsList from "../../components/ProductsList/ProductsList";
import { Link } from "react-router";
import styles from "./ProductsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

export default function Products() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
      <h1 className={styles.title}>Products</h1>
      <Link to="/products/create" className={styles.link}>
        + Add product
      </Link>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.length > 0 ? (
        <ProductsList products={data} />
      ) : (
        <p className={styles.text}>There are no products yet.</p>
      )}
    </>
  );
}
